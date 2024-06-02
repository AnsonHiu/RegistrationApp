'use server'

import { Team } from '@/app/model/team.model';
import { sql } from '@vercel/postgres';

import { unstable_noStore } from 'next/cache';
import { getParticipants } from './get-participants';
 
export async function getTeam(request: {name: string, eventCategoryId: number}) : Promise<Team[]>{
    try {
        unstable_noStore();
        var queryResult = await sql<Team>`SELECT * FROM Teams WHERE EventCategoryId = ${request.eventCategoryId} AND Name = ${request.name}`;
        return await Promise.all(queryResult.rows.map(async (team) => {
            const participants = await getParticipants(request.eventCategoryId, team.id);
            return { ...team, participants };
        }));
    } catch (error) {
        throw error;
    }
}