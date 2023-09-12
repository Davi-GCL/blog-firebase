import { IAuthor } from "./iauthor"

export class Post {
    id?:string
    title:string = ''
    text:string = ''
    thumbnailUrl:string = ''
    bannerUrl:string = ''
    author:IAuthor = {userId:'',userName:'',userPhoto:''}
    likes:number = 0
    datehour!:any | string
}
