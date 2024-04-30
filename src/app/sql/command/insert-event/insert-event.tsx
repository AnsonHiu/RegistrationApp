'use server'

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function addEventCommand(eventName: string) {
    try {
        await sql`INSERT INTO Event (Name) VALUES(${eventName})`;
        return {message: 'new event added'};
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}