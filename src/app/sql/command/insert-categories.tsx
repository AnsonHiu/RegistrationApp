'use server'

import EventCategory from '@/app/model/event-category.model';
import AddCategoriesCommand from '@/app/model/commands/add-categories-command.model';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
 
export default async function addCategoriesCommandHandler(command: AddCategoriesCommand) {
    try {
        console.log('server side', command);
        const insertCategoryTasks = command.eventCategories.map(category => addCategory(category, command.eventId));
        const result = await Promise.all([...insertCategoryTasks])
        return { message: 'Categories created: ' + result, status: 200 };
    } catch (error) {
        return { message: error, status: 500 };
    }
}

async function addCategory(category: EventCategory, eventId: number): Promise<QueryResult<QueryResultRow>> {
    return sql`INSERT INTO EventCategories (Name, Style, ParticipantsPerTeam, EventId) 
    VALUES(${category.name}, ${category.style}, ${category.participantsperteam}, ${eventId})`;
}