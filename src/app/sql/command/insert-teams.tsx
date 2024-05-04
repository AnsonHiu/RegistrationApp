'use server'

import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import AddTeamsCommand from '@/app/model/commands/add-teams-command.model';
import Team from '@/app/model/team.model';
 
export default async function addTeamsCommandHandler(command: AddTeamsCommand) {
    try {
        const insertCategoryTasks = command.teams.map(team => addTeam(team, command.eventCategoryId));
        await Promise.all([...insertCategoryTasks])
    } catch (error) {
        return { message: error, status: 500 };
    }
}

async function addTeam(team: Team, eventCategoryId: number): Promise<QueryResult<QueryResultRow>> {
    return sql`INSERT INTO Teams (Name, SignedIn, Paid, EventCategoryId) 
    VALUES(${team.name}, ${team.signedIn ? '1':'0'}, ${team.paid ? '1':'0'}, ${eventCategoryId})`;
}