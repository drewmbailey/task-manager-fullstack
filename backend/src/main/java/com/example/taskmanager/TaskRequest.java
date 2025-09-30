package com.example.taskmanager;

import jakarta.validation.constraints.NotBlank;

public record TaskRequest(
        @NotBlank String title,
        String description,
        String status
) { }
