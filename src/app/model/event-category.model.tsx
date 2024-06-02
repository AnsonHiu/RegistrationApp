interface IEventCategory {
    id: number;
    name: string;
    style: string;
    participantsperteam: number | undefined;
}

export class EventCategory {
    constructor(data: IEventCategory){
        this.id = data.id;
        this.name = data.name;
        this.style = data.style;
        this.participantsperteam = data.participantsperteam;
    }

    id: number;
    name: string;
    style: string;
    participantsperteam: number | undefined;
    eventid: number | undefined;
}