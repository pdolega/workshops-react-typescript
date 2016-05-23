import {Tweet} from "../TweetModel";

export class TweetSocketConnection {

    private socket: WebSocket;

    constructor(
        private onTweet: (tweet: Tweet) => void
    ) {
        this.tweetPushed = this.tweetPushed.bind(this);
    }

    connect(filter?: string) {
        let webSocketUrl = `ws://peaceful-ridge-14628.herokuapp.com/channel` + (filter != null ? `?filter=${filter}` : "");
        console.debug(`Actual websocket address: ${webSocketUrl}`);

        this.socket = new WebSocket(webSocketUrl);
        this.socket.onmessage = this.tweetPushed;
    }

    disconnect() {
        console.info("Web Socket is to be closed...");
        this.socket.close();
        this.socket = null;
    }

    private tweetPushed(msg: MessageEvent) {
        let tweet = JSON.parse(msg.data);
        this.onTweet(tweet);
    }
}