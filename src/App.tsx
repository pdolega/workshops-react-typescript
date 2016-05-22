import * as React from "react";
import * as ReactDom from "react-dom";
import {model, TweetList} from "./AppModel";

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
            <span>React-rendered text</span>
        );
    }
}

window["initReactPage"] = function() {
    console.debug("React component is being initialized");
    ReactDom.render(
        <App/>,
        document.getElementById("app-container")
    );
};