'use server'

import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import { DeleteTeamCommand } from "../model/command/delete-team-command.model";
import { getParticipants } from "../query/get-participants";
import { DeleteParticipantsCommandHandler } from "./delete-participants";

 
export async function deleteTeamsCommandHandler(command: DeleteTeamCommand) {
    try {
        const teamParticipants = await getParticipants(null, command.teamId);
        if(teamParticipants.length > 0) {
            const teamParticipantIds = teamParticipants.map(participant => participant.id).filter(id => id);
            await DeleteParticipantsCommandHandler({participantIds: teamParticipantIds});
        }
        return {message: 'categories created', status: 204};
    } catch (error) {
        return { message: error, status: 500 };
    }
}

async function deleteTeam(teamId: number): Promise<QueryResult<QueryResultRow>> {
    return await sql`DELETE FROM Teams WHERE Id = ${teamId}`;
}