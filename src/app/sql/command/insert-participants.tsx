'use server'

import AddParticipantsCommand from '@/app/model/commands/add-participants-command.model';
import Participant from '@/app/model/participant.model';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
 
export default async function addParticipantsCommandHandler(command: AddParticipantsCommand) {
    try {
        console.log(command);
        const insertCategoryTasks = command.participants.map(participant => addParticipant(participant, command.eventCategoryId));
        await Promise.all([...insertCategoryTasks])
    } catch (error) {
        console.log(error);
        return { message: error, status: 500 };
    }
    
    //TODO: teamId
    async function addParticipant(participant: Participant, eventCategoryId: number): Promise<QueryResult<QueryResultRow>> {
        return sql`INSERT INTO Participants (Name, DancerName, Email, SignedIn, Paid, EventCategoryId, TeamId) VALUES 
        (${participant.name}, ${participant.dancername}, ${participant.email}, ${participant.signedin ? '1' : '0'}, ${participant.paid ? '1' : '0'}, ${eventCategoryId}, null)`;
    }
}
