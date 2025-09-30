export type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: number
  title: string
  description?: string
  status: Status
  createdAt: string
  updatedAt: string
}
