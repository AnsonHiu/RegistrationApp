import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function DropTables() {

    try {
        const drop_table_result = await sql`DROP TABLE Participants, Teams, EventCategories, Events`
        
        return NextResponse.json({ 
            ...drop_table_result
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}