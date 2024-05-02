export default class Event {
    constructor(data: Event){
        this.id = data.id;
        this.name = data.name;
    }

    id: number;
    name: string;
}