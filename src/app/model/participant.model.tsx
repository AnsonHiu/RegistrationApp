interface IParticipant {
    id: number | undefined;
    name: string | undefined;
    dancername: string;
    email: string | undefined;
    signedin: boolean;
    paid: boolean;
}

export class Participant {
    id: number | undefined;
    name: string | undefined;
    dancername: string | undefined;
    email: string | undefined;
    signedin: boolean = false;
    paid: boolean = false;
    isUpdating: boolean = false;

    constructor(participant?: IParticipant){
        this.dancername = participant?.dancername ?? '';
        this.signedin = participant?.signedin ?? false;
        this.paid = participant?.paid ?? false;
        for(let property in participant) {
            // @ts-ignore
            if(participant.hasOwnProperty(property) && !this[property]) {
                // @ts-ignore
                this[property] = participant[property];
            }
        }
    }
}