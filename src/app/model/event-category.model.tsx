export class EventCategory {
    constructor(data: {Id: number, Name: string, Style: string, ParticipantsPerTeam: number}){
        this.Id = data.Id;
        this.Name = data.Name;
        this.Style = data.Style;
        this.ParticipantsPerTeam = data.ParticipantsPerTeam;
    }

    Id: number | undefined;
    Name: string;
    Style: string | undefined;
    ParticipantsPerTeam: number;

    public equals (eventCategory: EventCategory): boolean {
        return eventCategory?.Id == this.Id && 
            eventCategory?.Name == this.Name && 
            eventCategory?.Style == this.Style && 
            eventCategory?.ParticipantsPerTeam == this.ParticipantsPerTeam;
    }
}