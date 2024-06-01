import { Participant } from "./participant.model";

interface ITeam {
    id: number | undefined;
    name: string | undefined;
    participants: Participant[];
}

export class Team {
    constructor(data: ITeam){
        this.id = data.id;
        this.name = data.name;
        this.participants = data.participants;
    }

    id: number | undefined;
    name: string | undefined;
    participants: Participant[];
    isUpdate: boolean|undefined;
}