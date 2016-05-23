import {List} from "immutable";

export class TweetList {
    constructor(
        public tweets: List<Tweet> = List<Tweet>()
    ) {}
}

export interface Tweet {
    id: string;
    text:string;
    user:string;
    userImg:string;
}

export class TweetEntry implements Tweet {
    id: string;
    text: string;
    user: string;
    userImg: string;

    constructor(tweet: Tweet) {
        this.id = tweet.id;
        this.text = tweet.text;
        this.user = tweet.user;
        this.userImg = tweet.userImg;
    }
}