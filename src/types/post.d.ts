export type TPost = {
    id?: string
    imageUrl?: string | undefined
    userId?: string
    title: string
    description: string
    price: number 
    yearsExperience: string
    experienceField: string
    localisation: string
    currentCompany: string
    disponibilities?: Date[]
    isBooked?: boolean
    linkedin?: string | null | undefined
    whatsApp?: string | null | undefined
    twitter?: string | null | undefined
    profilePic? : string | null | undefined
    Title? : string
    author? : Author
}

type Author = {
    name : string
}