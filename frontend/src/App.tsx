import React, { useEffect, useMemo, useState } from 'react'
import { listTasks, createTask, updateTask, completeTask, deleteTask } from './api'
import type { Task, Status } from './types'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Status | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editing, setEditing] = useState<Task | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function refresh(status?: Status) {
    setLoading(true); setError(null)
    try {
      const data = await listTasks(status)
      setTasks(data)
    } catch (e: any) {
      setError(e.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh(filter) }, [filter])

  const filtered = useMemo(() => tasks, [tasks])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editing) {
        const upd = await updateTask(editing.id, { title, description, status: editing.status })
        setTasks(prev => prev.map(t => t.id === upd.id ? upd : t))
        setEditing(null)
      } else {
        const created = await createTask({ title, description })
        setTasks(prev => [created, ...prev])
      }
      setTitle(''); setDescription('')
    } catch (e: any) { setError(e.message ?? 'Error') }
  }

  function onEdit(task: Task) {
    setEditing(task)
    setTitle(task.title)
    setDescription(task.description ?? '')
  }

  async function onComplete(id: number) {
    const upd = await completeTask(id)
    setTasks(prev => prev.map(t => t.id === id ? upd : t))
  }

  async function onDelete(id: number) {
    await deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'Inter, system-ui, Arial' }}>
      <h1>Task Manager</h1>

      <section style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <label>Filter:</label>
        <select value={filter ?? ''} onChange={(e) => setFilter((e.target.value || undefined) as any)}>
          <option value="">All</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="DONE">Done</option>
        </select>
        <button onClick={() => refresh(filter)}>Refresh</button>
      </section>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">{editing ? 'Update Task' : 'Add Task'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setTitle(''); setDescription('') }}>Cancel</button>}
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Loading…</p> : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
          {filtered.map(t => (
            <li key={t.id} style={{ border: '1px solid #ccc', padding: '0.75rem', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{t.title}</strong>
                <span>{t.status}</span>
              </div>
              {t.description && <p style={{ marginTop: 4 }}>{t.description}</p>}
              <small>Created: {new Date(t.createdAt).toLocaleString()}</small>
              <div style={{ marginTop: 8, display: 'flex', gap: '0.5rem' }}>
                {t.status !== 'DONE' && <button onClick={() => onComplete(t.id)}>Complete</button>}
                <button onClick={() => onEdit(t)}>Edit</button>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
