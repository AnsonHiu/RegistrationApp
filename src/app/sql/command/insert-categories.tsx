'use server'

import EventCategory from '@/app/model/event-category.model';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { InsertCategoriesCommand } from '../model/command/insert-category-command.model';
 
export default async function addCategoriesCommandHandler(command: InsertCategoriesCommand) {
    try {
        const insertCategoryTasks = command.eventCategories.map(category => addCategory(category, command.eventId));
        await Promise.all([...insertCategoryTasks])
        return {message: 'categories created', status: 204};
    } catch (error) {
        return { message: error, status: 500 };
    }
}

async function addCategory(category: EventCategory, eventId: number): Promise<QueryResult<QueryResultRow>> {
    return sql`INSERT INTO EventCategories (Name, Style, ParticipantsPerTeam, EventId) 
    VALUES(${category.name}, ${category.style}, ${category.participantsperteam}, ${eventId})`;
}