import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const query_create_table_battle = 'CREATE TABLE Battle (Id SERIAL PRIMARY KEY, Name varchar(100));';
    const query_create_table_battle_category = 'CREATE TABLE BattleCategory (Id SERIAL PRIMARY KEY, Name varchar(100) NOT NULL, Style varchar(100) NULL, ParticipantsPerTeam integer NOT NULL, BattleId integer NOT NULL, CONSTRAINT fk_battle_id FOREIGN KEY(BattleId) REFERENCES Battle(Id));';
    const query_create_table_team = 'CREATE TABLE Team (Id SERIAL PRIMARY KEY, Name varchar(100));';
    const query_create_table_participant = 'CREATE TABLE Participant ( Id SERIAL PRIMARY KEY, Name varchar(100), DancerName varchar(100) NOT NULL, Email varchar(100), SignedIn BIT NOT NULL, Paid BIT NOT NULL, BattleCategoryId integer NOT NULL, CONSTRAINT fk_BattleCategory_Id FOREIGN KEY(BattleCategoryId) REFERENCES BattleCategory(Id), TeamId integer, CONSTRAINT fk_Team_Id FOREIGN KEY(TeamId) REFERENCES Team(Id));';

    try {
        const create_battle_result = await sql`CREATE TABLE Battle (Id SERIAL PRIMARY KEY, Name varchar(100));`;
        const create_battle_category_result = await sql`CREATE TABLE BattleCategory (Id SERIAL PRIMARY KEY, Name varchar(100) NOT NULL, Style varchar(100) NULL, ParticipantsPerTeam integer NOT NULL, BattleId integer NOT NULL, CONSTRAINT fk_battle_id FOREIGN KEY(BattleId) REFERENCES Battle(Id));`;
        const create_table_team_result = await sql`CREATE TABLE Team (Id SERIAL PRIMARY KEY, Name varchar(100));`;
        const create_participant_result = await sql`CREATE TABLE Participant ( Id SERIAL PRIMARY KEY, Name varchar(100), DancerName varchar(100) NOT NULL, Email varchar(100), SignedIn BIT NOT NULL, Paid BIT NOT NULL, BattleCategoryId integer NOT NULL, CONSTRAINT fk_BattleCategory_Id FOREIGN KEY(BattleCategoryId) REFERENCES BattleCategory(Id), TeamId integer, CONSTRAINT fk_Team_Id FOREIGN KEY(TeamId) REFERENCES Team(Id));`;
        
        return NextResponse.json({ 
            ...create_battle_result, 
            ...create_battle_category_result,
            ...create_table_team_result,
            ...create_participant_result
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}