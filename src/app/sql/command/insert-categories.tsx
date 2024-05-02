'use server'

import EventCategory from '@/app/model/event-category.model';
import AddCategoriesCommand from '@/app/model/commands/add-categories-command.model';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
 
export default async function addCategoriesCommandHandler(command: AddCategoriesCommand) {
    try {
        const insertCategoryTasks = command.eventCategories.map(category => addCategory(category, command.eventId));
        await Promise.all([...insertCategoryTasks])
    } catch (error) {
        return { message: error, status: 500 };
    }
    redirect('/');
}

async function addCategory(category: EventCategory, eventId: number): Promise<QueryResult<QueryResultRow>> {
    return sql`INSERT INTO EventCategories (Name, Style, ParticipantsPerTeam, EventId) 
    VALUES(${category.name}, ${category.style}, ${category.participantsperteam}, ${eventId})`;
}