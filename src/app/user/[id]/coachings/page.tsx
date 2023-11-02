"use client"
import { findReservation } from "@/lib/db.reservation";
import { useState, useEffect } from "react";
const Coachings = ({ params }: { params: { id: string } }) => {

    const [reservationData, setReservationData] = useState([])
    console.log(params.id)
    async function findUser(){
        const reservations = await findReservation(params.id)
        setReservationData(reservations.reservations)
    }
    console.table(reservationData)
    useEffect(() => {
        findUser()
    }, [])
    return <div>
    </div>
};

export default Coachings;
