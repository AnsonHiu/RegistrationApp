'use server'

import { sql } from '@vercel/postgres';
import Team from '@/app/model/team.model';
import updateParticipantsCommandHandler from './update-participants';
 
export default async function updateTeamCommandHandler(command: UpdateTeamCommand):Promise<Team> {
    try {
        const updatedTeam = await updateTeam(command.team);
        if(command.team.participants.some(participant => participant)) {
            updatedTeam.participants = await updateParticipantsCommandHandler({
                participants: command.team.participants
            })
        }
        return updatedTeam;
    } catch (error) {
        throw error;
    }
}

async function updateTeam(team: Team): Promise<Team> {
    await sql `UPDATE Teams SET Name = ${team.name} WHERE Id = ${team.id}`
    return (await sql<Team>`SELECT * FROM Teams WHERE Id = ${team.id}`).rows[0];
}

interface UpdateTeamCommand {
    team: Team;
}