import { IAuthor } from "./iauthor"

export class Post {
    
    // assign({ id, title, text, thumbnailUrl, bannerUrl, author, likes, datehour, tag }: { id: string; title: string; text: string; thumbnailUrl: string; bannerUrl: string; author: IAuthor; likes: Array<string>; datehour: any | string; tag: any; })
    // {
    //     this.id = id;
    //     this.title = title;
    //     this.text = text;
    //     this.thumbnailUrl = thumbnailUrl;
    //     this.bannerUrl = bannerUrl;
    //     this.author = author;
    //     this.likes = likes;
    //     this.datehour = datehour;
    //     this.tag = tag;
    // }

    id?:string
    title:string = ''
    text:string = ''
    thumbnailUrl:string = ''
    bannerUrl:string = ''
    author:IAuthor = {userId:'',userName:'',userPhoto:''}
    likes!:Array<string>;
    datehour!:any | string;
    tag?:any = '';
    isVerified?: boolean = false;
}
