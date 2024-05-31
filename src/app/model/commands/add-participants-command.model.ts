import Participant from '../participant.model';

export default interface IAddParticipantsCommand {
    participants: Participant[];
    eventCategoryId: number;
    teamId: number | null;
}