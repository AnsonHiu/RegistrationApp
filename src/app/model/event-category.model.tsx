export default class EventCategory {
    constructor(data: {id: number, name: string, style: string, participantsperteam: number}){
        this.id = data.id;
        this.name = data.name;
        this.style = data.style;
        this.participantsperteam = data.participantsperteam;
    }

    id: number;
    name: string;
    style: string;
    participantsperteam: number;
}