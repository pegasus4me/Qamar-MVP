import axios from "axios"
import { Treservation } from "@/types/reservation"

export async function findReservation(userId: string): Promise<Treservation | any | undefined> {

    try {
        const findUserReservations = await axios.get("/api/user/findById", {
            
            params : {
                id: userId
            }
        })
        return findUserReservations.data
    } catch (e: any) {
        return e
    }


}