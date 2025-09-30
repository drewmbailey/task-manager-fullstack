import type { Task, Status } from './types'

const headers = { 'Content-Type': 'application/json' }

export async function listTasks(status?: Status): Promise<Task[]> {
  const qs = status ? `?status=${status}` : ''
  const res = await fetch(`/api/tasks${qs}`)
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(data: { title: string; description?: string; status?: Status }): Promise<Task> {
  const res = await fetch('/api/tasks', { method: 'POST', headers, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function updateTask(id: number, data: { title: string; description?: string; status?: Status }): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function completeTask(id: number): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}/complete`, { method: 'PATCH' })
  if (!res.ok) throw new Error('Failed to complete task')
  return res.json()
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete task')
}
