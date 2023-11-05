import { Treservation } from "./reservation"
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
    profilePic : string | StaticImport
    Title? : string
    author? : Author
    authorName?: string
}

export interface ExtendPost extends TPost {
    Reservation : Treservation[]
}

type Author = {
    name : string
}