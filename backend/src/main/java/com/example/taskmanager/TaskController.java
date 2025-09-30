package com.example.taskmanager;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository repo;

    public TaskController(TaskRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Task> all(@RequestParam(value = "status", required = false) String status) {
        if (status == null || status.isBlank()) return repo.findAll();
        return repo.findByStatus(Task.Status.valueOf(status.toUpperCase()));
    }

    @GetMapping("/{id}")
    public Task one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Task create(@Valid @RequestBody TaskRequest body) {
        Task task = Task.builder()
                .title(body.title())
                .description(body.description())
                .status(parseStatus(body.status()))
                .build();
        return repo.save(task);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @Valid @RequestBody TaskRequest body) {
        return repo.findById(id).map(t -> {
            t.setTitle(body.title());
            t.setDescription(body.description());
            t.setStatus(parseStatus(body.status()));
            t.setUpdatedAt(Instant.now());
            return repo.save(t);
        }).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @PatchMapping("/{id}/complete")
    public Task complete(@PathVariable Long id) {
        return repo.findById(id).map(t -> {
            t.setStatus(Task.Status.DONE);
            t.setUpdatedAt(Instant.now());
            return repo.save(t);
        }).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    private Task.Status parseStatus(String status) {
        if (status == null || status.isBlank()) return Task.Status.OPEN;
        try {
            return Task.Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + status + ". Valid values are: OPEN, IN_PROGRESS, DONE");
        }
    }
}
