import Participant from "./participant.model";

export default class Team {
    constructor(data: Team){
        this.id = data.id;
        this.name = data.name;
        this.signedin = data.signedin
        this.paid = data.paid
        this.participants = data.participants;
    }

    id: number | undefined;
    name: string | undefined;
    signedin: boolean;
    paid: boolean;
    participants: Participant[];
}