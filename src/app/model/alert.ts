export class Alert {
    constructor(public id:string, public title?: string, public message?: string, public type:string = "warning")
    {
        this.type = `alert-${this.type}`

        if(!this.title && !this.message) throw new Error("alert title or message must have a content");
    }

}
