'use server'

import Team from '@/app/model/team.model';
import { sql } from '@vercel/postgres';

import { unstable_noStore } from 'next/cache';
import { getParticipants } from './get-participants';
 
export async function getTeams(eventCategoryId: number) : Promise<Team[]>{
    try {
        unstable_noStore();
        var queryResult = await sql<Team>`SELECT * FROM Teams WHERE EventCategoryId = ${eventCategoryId}`;
        return await Promise.all(queryResult.rows.map(async (team) => {
            const paid = team.paid == true;
            const signedin = team.signedin == true;
            const participants = await getParticipants(eventCategoryId, team.id);
            return { ...team, paid, signedin, participants };
        }));
    } catch (error) {
        throw error;
    }
}