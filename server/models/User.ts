// MongoDB User Schema
export interface User {
  _id?: string
  name: string
  email: string
  passwordHash: string
  role: "Student" | "Club Admin" | "Recruiter" | "Institution" | "Super Admin"
  college: string
  skills?: string[]
  avatar?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface Club {
  _id?: string
  name: string
  description: string
  logo?: string
  banner?: string
  admins: string[] // User IDs
  members: string[] // User IDs
  memberCount: number
  pendingRequests: string[] // User IDs
  events: string[] // Event IDs
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  _id?: string
  title: string
  description: string
  clubId: string
  dateTime: Date
  location: string
  capacity: number
  attendees: string[] // User IDs
  rsvps: { userId: string; status: "yes" | "no" | "maybe" }[]
  tags: string[]
  live: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  _id?: string
  senderId: string
  recipientId?: string
  groupId?: string
  text: string
  attachments?: string[]
  readBy: string[]
  createdAt: Date
}

export interface Job {
  _id?: string
  recruiterId: string
  title: string
  description: string
  company: string
  location: string
  salary?: string
  jobType: "Internship" | "Full-time" | "Part-time"
  skills: string[]
  applicants: string[] // User IDs
  createdAt: Date
  updatedAt: Date
}

export interface Report {
  _id?: string
  reporterId: string
  targetId: string
  type: string
  reason: string
  status: "pending" | "resolved" | "dismissed"
  createdAt: Date
  updatedAt: Date
}
