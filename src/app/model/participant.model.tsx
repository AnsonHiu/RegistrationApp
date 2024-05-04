export default class Participant {
    constructor(participant: Participant){
        this.dancername = participant.dancername;
        this.signedin = participant.signedin;
        this.paid = participant.paid;
        for(let property in participant) {
            // @ts-ignore
            if(participant.hasOwnProperty(property) && !this[property]) {
                // @ts-ignore
                this[property] = participant[property];
            }
        }
    }

    id: number | undefined;
    name: string | undefined;
    dancername: string;
    email: string | undefined;
    signedin: boolean;
    paid: boolean;
}