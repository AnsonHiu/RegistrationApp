import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    try {
        const drop_table = sql`DROP TABLE Participants, Teams, EventCategories, Events`
        const create_event = sql`CREATE TABLE Events (Id SERIAL PRIMARY KEY, Name varchar(100));`;
        const create_event_category = sql`CREATE TABLE EventCategories (Id SERIAL PRIMARY KEY, Name varchar(100) NOT NULL, Style varchar(100) NULL, ParticipantsPerTeam integer NOT NULL, EventId integer NOT NULL, CONSTRAINT fk_Event_id FOREIGN KEY(EventId) REFERENCES Events(Id));`;
        const create_table_team = sql`CREATE TABLE Teams (Id SERIAL PRIMARY KEY, Name varchar(100) NOT NULL, SignedIn BIT NOT NULL, Paid BIT NOT NULL, EventCategoryId integer NOT NULL, CONSTRAINT fk_EventCategory_Id FOREIGN KEY(EventCategoryId) REFERENCES EventCategories(Id));`;
        const create_participant = sql`CREATE TABLE Participants ( Id SERIAL PRIMARY KEY, Name varchar(100), DancerName varchar(100) NOT NULL, Email varchar(100), SignedIn BIT NOT NULL, Paid BIT NOT NULL, EventCategoryId integer NOT NULL, CONSTRAINT fk_EventCategory_Id FOREIGN KEY(EventCategoryId) REFERENCES EventCategories(Id), TeamId integer, CONSTRAINT fk_Team_Id FOREIGN KEY(TeamId) REFERENCES Teams(Id));`;
        const results = await Promise.all([drop_table, create_event, create_event_category, create_table_team, create_participant]);
        
        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}