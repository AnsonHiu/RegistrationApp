import Team from '../team.model';

export default class AddTeamsCommand {
    constructor(addTeamsCommand: AddTeamsCommand) {
        this.teams = addTeamsCommand.teams;
        this.eventCategoryId = addTeamsCommand.eventCategoryId
    }
    teams: Team[];
    eventCategoryId: number;
}