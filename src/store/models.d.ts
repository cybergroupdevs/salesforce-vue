export interface Environment {
  sfApiUrl: string
}

export interface Case {
  accountid: string,
  status: string,
  origin: string,
  description: string,
  subject: string
}