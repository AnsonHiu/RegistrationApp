'use server'

import Team from '@/app/model/team.model';
import { sql } from '@vercel/postgres';

import { unstable_noStore } from 'next/cache';
 
export async function getTeams(eventCategoryId: number) : Promise<Team[]>{
    try {
        unstable_noStore();
        var event = await sql<Team>`SELECT * FROM Teams WHERE EventCategoryId = ${eventCategoryId}`;
        return event.rows;
    } catch (error) {
        throw error;
    }
}