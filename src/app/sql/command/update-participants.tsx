'use server'

import { Participant } from '@/app/model/participant.model';
import { sql } from '@vercel/postgres';
 
export async function updateParticipantsCommandHandler(command: UpdateParticipantsCommand): Promise<Participant[]> {
    try {
        const updateParticipantTasks = command.participants.map(participant => updateParticipant(participant));
        return await Promise.all(updateParticipantTasks);
    } catch (error) {
        throw error;
    }
    
    async function updateParticipant(participant: Participant): Promise<Participant> {
        await sql`UPDATE Participants SET Name = ${participant.name}, DancerName = ${participant.dancername}, Email = ${participant.email}, SignedIn = ${participant.signedin ? 1 : 0}, Paid = ${participant.paid ? 1 : 0} WHERE Id = ${participant.id}`;
        return (await sql<Participant>`SELECT * FROM Participants WHERE Id = ${participant.id}`).rows.map(participant => {
            const paid = participant.paid == true;
            const signedin = participant.signedin == true;
            return {...participant, paid, signedin};
        })[0];
    }
}

export interface UpdateParticipantsCommand {
    participants: Participant[];
}