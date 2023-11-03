"use client"
import { findReservation } from "@/lib/db.reservation";
import { useState, useEffect } from "react";
const Coachings = ({ params }: { params: { id: string } }) => {

    const [reservationData, setReservationData] = useState([])
    
    async function findUser(){
        const reservations = await findReservation(params.id)
        setReservationData(reservations.reservations)
    }
    
    useEffect(() => {
        findUser()
    }, [])
    
    return <div>
    <p>afficher les reservations prises pour les user et les post crées par les coach</p>
    </div>
};

export default Coachings;
