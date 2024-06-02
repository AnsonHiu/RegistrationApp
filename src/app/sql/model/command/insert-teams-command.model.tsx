import { Team } from "@/app/model/team.model";

export class InsertTeamsCommand {
    constructor(addTeamsCommand: InsertTeamsCommand) {
        this.teams = addTeamsCommand.teams;
        this.eventCategoryId = addTeamsCommand.eventCategoryId
    }
    teams: Team[];
    eventCategoryId: number;
}