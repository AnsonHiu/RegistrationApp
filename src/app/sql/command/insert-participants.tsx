'use server'

import IAddParticipantsCommand from '@/app/model/commands/add-participants-command.model';
import Participant from '@/app/model/participant.model';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
 
export default async function addParticipantsCommandHandler(command: IAddParticipantsCommand) {
    try {
        console.log(command);
        const insertCategoryTasks = command.participants.map(participant => addParticipant(participant, command.eventCategoryId, command.teamId));
        await Promise.all([...insertCategoryTasks])
    } catch (error) {
        console.log(error);
        return { message: error, status: 500 };
    }
    
    async function addParticipant(participant: Participant, eventCategoryId: number, teamId: number | null): Promise<QueryResult<QueryResultRow>> {
        return sql`INSERT INTO Participants (Name, DancerName, Email, SignedIn, Paid, EventCategoryId, TeamId) VALUES 
        (${participant.name}, ${participant.dancername}, ${participant.email}, ${participant.signedin ? 1 : 0}, ${participant.paid ? 1 : 0}, ${eventCategoryId}, ${teamId})`;
    }
}
