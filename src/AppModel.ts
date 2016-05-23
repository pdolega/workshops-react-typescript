import {TweetSocketConnection, Tweet} from "./socket/TweetSocketConnection";
import {List} from "immutable";
import {Util} from "./util/Util";

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

export class TweetList {
    constructor(
        public tweets: List<Tweet> = List<Tweet>()
    ) {}
}

export type ModelListener = (model: TweetList) => void;

export class AppModel {
    model: TweetList = new TweetList();

    private listener: ModelListener = (listener: TweetList) => {};

    private socketConnection: TweetSocketConnection;

    constructor() {
        this.onTweet = this.onTweet.bind(this);
        this.modifyTweet = this.modifyTweet.bind(this);

        this.socketConnection = new TweetSocketConnection(this.onTweet);
        this.socketConnection.connect();
    }

    public listen(listener: ModelListener): void {
        this.listener = listener;
    }

    public modifyTweet(id: string, newValue: string): void {
        this.model.tweets = Util.update(this.model.tweets, tweet => tweet.id === id, tweet => tweet.text = newValue);
        this.listener(this.model);
    }

    private onTweet(newTweet: Tweet): void {
        console.debug(`New tweet available: [${newTweet.id}] ${newTweet.text}`);

        this.model = new TweetList(
          this.model.tweets.unshift(newTweet)
        );
        this.listener(this.model);
    }
}

export let model = new AppModel();