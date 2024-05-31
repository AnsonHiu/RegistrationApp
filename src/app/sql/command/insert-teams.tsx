'use server'

import { QueryResult, sql } from '@vercel/postgres';
import AddTeamsCommand from '@/app/model/commands/add-teams-command.model';
import Team from '@/app/model/team.model';
import addParticipantsCommandHandler from './insert-participants';
 
export default async function addTeamsCommandHandler(command: AddTeamsCommand) {
    try {
        let addParticipantTasks: Promise<{message: unknown, status: number} | undefined>[] = [];

        command.teams.forEach(async team => {
            const commandResult = await addTeam(team, command.eventCategoryId);
            const teamId = commandResult.rows[0].id;
            if(team.participants.length > 0) {
                addParticipantTasks.push(addParticipantsCommandHandler({
                    participants: team.participants,
                    eventCategoryId: command.eventCategoryId,
                    teamId: teamId ?? null
                }))
            }
        });
        
        await Promise.all([...addParticipantTasks])
    } catch (error) {
        return { message: error, status: 500 };
    }
}

async function addTeam(team: Team, eventCategoryId: number): Promise<QueryResult<Team>> {
    await sql`INSERT INTO Teams (Name, SignedIn, Paid, EventCategoryId) 
    VALUES(${team.name}, ${team.signedin ? '1':'0'}, ${team.paid ? '1':'0'}, ${eventCategoryId})`
    return await sql<Team>`SELECT * FROM Teams WHERE Name = ${team.name} AND EventCategoryId = ${eventCategoryId}`;
}