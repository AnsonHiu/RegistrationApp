import EventCategory from "@/app/model/event-category.model";

export class InsertCategoriesCommand {
    constructor(addCategoriesCommand: InsertCategoriesCommand) {
        this.eventCategories = addCategoriesCommand.eventCategories;
        this.eventId = addCategoriesCommand.eventId
    }
    eventCategories: EventCategory[];
    eventId: number;
}