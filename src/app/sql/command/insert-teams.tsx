'use server'

import { sql } from '@vercel/postgres';
import { Team } from '@/app/model/team.model';
import { addParticipantsCommandHandler } from './insert-participants';
import { InsertTeamsCommand } from '../model/command/insert-teams-command.model';
 
export async function addTeamsCommandHandler(command: InsertTeamsCommand):Promise<Team[]> {
    try {
        let teams: Team[] = [];
        for (let i = 0; i<command.teams.length; i++){
            let team = command.teams[i];
            const addedTeam = await addTeam(team, command.eventCategoryId);
            if(team.participants.some(participant => participant)){
                const addedParticipants = await addParticipantsCommandHandler({
                    participants: team.participants,
                    eventCategoryId: command.eventCategoryId,
                    teamId: addedTeam.id ?? null
                })
                addedTeam.participants = addedParticipants;
            }
            teams.push(addedTeam);
        }
        return teams;
    } catch (error) {
        throw error;
    }
}

async function addTeam(team: Team, eventCategoryId: number): Promise<Team> {
    await sql`INSERT INTO Teams (Name, EventCategoryId) 
    VALUES(${team.name}, ${eventCategoryId})`
    const queryResult = await sql<Team>`SELECT * FROM Teams WHERE Name = ${team.name} AND EventCategoryId = ${eventCategoryId}`;
    return queryResult.rows[0];
}