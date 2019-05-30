export interface Environment {
  sfApiUrl: string
}

export interface Case {
  accountid: string,
  status: string,
  origin: string,
  description: string,
  subject: string
  contactid: string
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