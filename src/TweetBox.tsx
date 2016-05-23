import * as React from "react";
import {PureComponent} from "./util/PureComponent";
import {Tweet} from "./TweetModel";

export interface Props {
    tweet: Tweet;
    modifyTweet: (id: string, newValue: string) => void;
}

export interface State {
    edit: boolean;
}

export class TweetBox extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.editMode = this.editMode.bind(this);
        this.save = this.save.bind(this);
        this.updateText = this.updateText.bind(this);

        this.state = {edit: false};
    }

    public render(): JSX.Element {
        return (
            <div>
                <img src={this.props.tweet.userImg}/>
                <span>{this.props.tweet.user}</span>

                {this.renderContents()}

                {this.renderButtons()}
                <br/>
            </div>
        );
    }

    private renderButtons(): JSX.Element {
        if(!this.state.edit) {
            return <button onClick={this.editMode}>Edit</button>;
        } else {
            return <button onClick={this.save}>Save</button>;
        }
    }

    private renderContents(): JSX.Element {
        if(!this.state.edit) {
            return <span>{this.props.tweet.text}</span>;
        } else {
            return (
                <textarea value={this.props.tweet.text} onChange={this.updateText} />
            );
        }
    }

    private updateText(event: any): void {
        let value = event.target.value;
        this.props.modifyTweet(this.props.tweet.id, value);
    }

    private editMode(): void {
        this.setState({edit: true});
    }

    private save(): void {
        this.setState({edit: false});
    }
}