export interface Environment {
  sfApiUrl: string
}

export interface Case {
  id: string
  accountid: string,
  status: string,
  origin: string,
  description: string,
  subject: string,
  contactid: string,
  type: string,
  reason: string,
  priority: string
}

export interface Account {
  sfid: string,
  name: string,
  phone: string,
  type: string,
  industry: string
}

export interface Contact {
  sfid: string,
  name: string,
  accountid: string,
  phone: string,
  email: string
}