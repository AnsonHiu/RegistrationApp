import EventCategory from '../event-category.model';

export default class AddCategoriesCommand {
    constructor(addCategoriesCommand: AddCategoriesCommand) {
        this.eventCategories = addCategoriesCommand.eventCategories;
        this.eventId = addCategoriesCommand.eventId
    }
    eventCategories: EventCategory[];
    eventId: number;
}