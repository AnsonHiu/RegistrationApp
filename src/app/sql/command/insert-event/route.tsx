import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function AddEventCommand(battleName: string) {
    try {
        const insert_battle_result = await sql`INSERT INTO Battle VALUES(${battleName});`;
        return NextResponse.json({ create_battle_result: insert_battle_result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}