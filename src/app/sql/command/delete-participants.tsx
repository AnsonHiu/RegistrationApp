'use server'

import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { DeleteParticipantsCommand } from '../model/command/delete-participants-command.model';
 
export async function DeleteParticipantsCommandHandler(command: DeleteParticipantsCommand): Promise<void> {
    try {
        await deleteParticipants(command.participantIds);
    } catch (error) {
        throw error;
    }
}

async function deleteParticipants(participantIds: number[]) {
    let tasks: Promise<QueryResult<QueryResultRow>>[] = [];
    participantIds.forEach(id => {
        tasks.push(sql`DELETE FROM Participants WHERE id IN (${id})`);    
    });
    await Promise.all(tasks);
}