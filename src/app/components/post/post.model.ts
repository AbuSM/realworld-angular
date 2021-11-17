export class Post {
    public title: string;
    public description: string;
    public username?: string;
    public date?: string;
    public likesCount?: number;

    constructor(title: string, description: string, username?: string, date?: string, likesCount?: number) {
        this.title = title;
        this.description = description;
        this.username = username;
        this.date = date;
        this.likesCount = likesCount;
    }
}
