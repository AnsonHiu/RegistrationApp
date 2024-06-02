'use server'

import { EventCategory } from '@/app/model/event-category.model';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { InsertCategoriesCommand } from '../model/command/insert-category-command.model';
 
export async function addCategoriesCommandHandler(command: InsertCategoriesCommand): Promise<void> {
    try {
        const insertCategoryTasks = command.eventCategories.map(category => addCategory(category, command.eventId));
        await Promise.all([...insertCategoryTasks])
    } catch (error) {
        throw error;
    }
}

async function addCategory(category: EventCategory, eventId: number): Promise<QueryResult<QueryResultRow>> {
    return await sql`INSERT INTO EventCategories (Name, Style, ParticipantsPerTeam, EventId) 
    VALUES(${category.name}, ${category.style}, ${category.participantsperteam}, ${eventId})`;
}