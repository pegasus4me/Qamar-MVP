import { TPost } from "./post"
export type Treservation = {
    id?: string
    payed? : boolean
    DateReserved : Date
    message: string
    authorId? : string
    postId? : string
    Reservation? : []
    authorName? : string
    
}

export interface ExtendReservation extends Treservation {
    postReference : TPost
}

