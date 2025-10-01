import type { Task, Status } from './types'

const headers = { 'Content-Type': 'application/json' }

// Determine the API base URL based on environment
const API_BASE_URL = import.meta.env.PROD 
  ? ''  // In production, use relative URLs (same origin since backend serves frontend)
  : 'http://localhost:8080' // In development, use the backend port

export async function listTasks(status?: Status): Promise<Task[]> {
  const qs = status ? `?status=${status}` : ''
  const url = API_BASE_URL ? `${API_BASE_URL}/api/tasks${qs}` : `/api/tasks${qs}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(data: { title: string; description?: string; status?: Status }): Promise<Task> {
  const url = API_BASE_URL ? `${API_BASE_URL}/api/tasks` : `/api/tasks`
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function updateTask(id: number, data: { title: string; description?: string; status?: Status }): Promise<Task> {
  const url = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${id}` : `/api/tasks/${id}`
  const res = await fetch(url, { method: 'PUT', headers, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function completeTask(id: number): Promise<Task> {
  const url = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${id}/complete` : `/api/tasks/${id}/complete`
  const res = await fetch(url, { method: 'PATCH' })
  if (!res.ok) throw new Error('Failed to complete task')
  return res.json()
}

export async function deleteTask(id: number): Promise<void> {
  const url = API_BASE_URL ? `${API_BASE_URL}/api/tasks/${id}` : `/api/tasks/${id}`
  const res = await fetch(url, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete task')
}
