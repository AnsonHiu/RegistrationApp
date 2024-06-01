'use server'

import { sql } from '@vercel/postgres';
import { DeleteParticipantsCommand } from '../model/command/delete-participants-command.model';
 
export async function DeleteParticipantsCommandHandler(command: DeleteParticipantsCommand) {
    try {
        await deleteParticipants(command.participantIds);
        return {message: 'categories created', status: 204};
    } catch (error) {
        return { message: error, status: 500 };
    }
}

async function deleteParticipants(participantIds: number[]) {
    return await sql`DELETE FROM Participants WHERE id IN (${participantIds.join(', ')})`;
}