export const BUSINESS_TYPES = [
  "Lawyer",
  "Insurance Agent",
  "Chiropractor",
  "Dentist",
  "Other",
] as const

export type BusinessType = (typeof BUSINESS_TYPES)[number]
