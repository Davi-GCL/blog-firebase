import { IAuthor } from "./iauthor";

export class Author implements IAuthor {
    userId: string;
    userName: string;
    userPhoto: string;

    constructor(userId: string, userName: string, userPhoto: string){
        this.userId = userId;
        this.userName = userName;
        this.userPhoto = userPhoto;
    }
}