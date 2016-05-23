import {TweetSocketConnection} from "./socket/TweetSocketConnection";
import {Util} from "./util/Util";
import {TweetList, Tweet} from "./TweetModel";

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