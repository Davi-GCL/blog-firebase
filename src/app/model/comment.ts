import { IAuthor } from "./iauthor";

export class Comment{
    constructor(author:IAuthor, text:string, datehour:any){
        this.author = author;
        this.text = text;
        this.datehour = datehour;
    }

    id?:string
    author!:IAuthor
    text:string = ''
    datehour:any = ''
}