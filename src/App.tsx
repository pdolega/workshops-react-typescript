import * as React from "react";
import * as ReactDom from "react-dom";
import {model, TweetList} from "./AppModel";
import {TweetBox} from "./TweetBox";
import {Tweet} from "./socket/TweetSocketConnection";
import {MonitorPerf} from "./util/MonitorPerf";

export class App extends React.Component<void, TweetList> {
    constructor() {
        super();
        this.state = new TweetList();

        this.onChange = this.onChange.bind(this);
    }

    public componentWillMount(): void {
        model.listen(this.onChange);
    }

    private onChange(tweetList: TweetList): void {
        this.setState(tweetList);
    }

    public render(): JSX.Element {
        return (
            <div>
                <MonitorPerf/>
                <span>Number of tweets received thus far: {this.state.tweets.size}</span>

                <div>
                    {this.renderTweets()}
                </div>
            </div>
        );
    }

    private renderTweets(): JSX.Element[] {
        return this.state.tweets.map((tweet: Tweet) => <TweetBox tweet={tweet} modifyTweet={model.modifyTweet} key={tweet.id}/>).toArray();
    }
}

window["initReactPage"] = function() {
    console.debug("React component is being initialized");
    ReactDom.render(
        <App/>,
        document.getElementById("app-container")
    );
};