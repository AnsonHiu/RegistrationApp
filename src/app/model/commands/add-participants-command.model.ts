import Participant from '../participant.model';

export default class AddParticipantsCommand {
    constructor(addParticipantsCommand: AddParticipantsCommand) {
        this.participants = addParticipantsCommand.participants;
        this.eventCategoryId = addParticipantsCommand.eventCategoryId
    }
    participants: Participant[];
    eventCategoryId: number;
}