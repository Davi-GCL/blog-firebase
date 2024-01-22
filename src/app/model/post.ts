import { IAuthor } from "./iauthor"

export class Post {
    id?:string
    title:string = ''
    text:string = ''
    thumbnailUrl:string = ''
    bannerUrl:string = ''
    author:IAuthor = {userId:'',userName:'',userPhoto:''}
    likes!:Array<string>;
    datehour!:any | string;
    tag?:any = ''
}
