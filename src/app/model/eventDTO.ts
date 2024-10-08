export class EventDTO {
    constructor(public status: 'completed' | 'editing' | 'pending', public data?: any){}
}