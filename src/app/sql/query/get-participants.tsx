'use server'

import { Participant } from '@/app/model/participant.model';
import { sql } from '@vercel/postgres';

import { unstable_noStore } from 'next/cache';
 
export async function getParticipants(eventCategoryId: number|null = null, teamId: number|null = null) : Promise<Participant[]>{
    try {
        unstable_noStore();
        var event = teamId === null 
            ? await sql<Participant>`SELECT * FROM Participants WHERE EventCategoryId = ${eventCategoryId}`
            : await sql<Participant>`SELECT * FROM Participants WHERE TeamId = ${teamId}`
             
        return event.rows.map(participant => {
            const paid = participant.paid == true;
            const signedin = participant.signedin == true;
            return {...participant, paid, signedin};
        });
    } catch (error) {
        throw error;
    }
}