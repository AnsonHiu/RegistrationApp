export default class Team {
    constructor(data: Team){
        this.id = data.id;
        this.name = data.name;
        this.signedIn = data.signedIn
        this.paid = data.paid
    }

    id: number | undefined;
    name: string | undefined;
    signedIn: boolean;
    paid: boolean;
}