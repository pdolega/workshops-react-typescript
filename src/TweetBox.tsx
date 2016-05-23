import * as React from "react";
import {Tweet} from "./socket/TweetSocketConnection";

export interface Props {
    tweet: Tweet;
}

export class TweetBox extends React.Component<Props, void> {
    constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                <img src={this.props.tweet.userImg}/>
                <span>{this.props.tweet.user}</span>
                <span>{this.props.tweet.text}</span>
                <br/>
            </div>
        );
    }
}