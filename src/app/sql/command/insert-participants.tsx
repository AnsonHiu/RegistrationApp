'use server'

import { Participant } from '@/app/model/participant.model';
import { sql } from '@vercel/postgres';
 
export async function addParticipantsCommandHandler(command: IAddParticipantsCommand): Promise<Participant[]> {
    try {
        const insertCategoryTasks = command.participants.map(participant => addParticipant(participant, command.eventCategoryId, command.teamId));
        return await Promise.all([...insertCategoryTasks])
    } catch (error) {
        throw error;
    }
    
    async function addParticipant(participant: Participant, eventCategoryId: number, teamId: number | null): Promise<Participant> {
        await sql`INSERT INTO Participants (Name, DancerName, Email, SignedIn, Paid, EventCategoryId, TeamId) VALUES 
        (${participant.name}, ${participant.dancername}, ${participant.email}, ${participant.signedin ? 1 : 0}, ${participant.paid ? 1 : 0}, ${eventCategoryId}, ${teamId})`;
        const query = teamId === null 
            ? await sql<Participant>`SELECT * FROM Participants WHERE DancerName = ${participant.dancername} AND EventCategoryId = ${eventCategoryId}`
            : await sql<Participant>`SELECT * FROM Participants WHERE DancerName = ${participant.dancername} AND EventCategoryId = ${eventCategoryId} AND TeamId = ${teamId}`; 
            
        return query.rows.map(participant => {
            const paid = participant.paid == true;
            const signedin = participant.signedin == true;
            return {...participant, paid, signedin};
        })[0];
    }
}

export interface IAddParticipantsCommand {
    participants: Participant[];
    eventCategoryId: number;
    teamId: number | null;
}