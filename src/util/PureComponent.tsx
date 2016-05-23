import * as React from "react";
import {Util} from "./Util";

export class PureComponent<P, S> extends React.Component<P, S> {
    public shouldComponentUpdate(nextProps: P, nextState: S): boolean {
        return Util.objChanged(this.props, nextProps) || this.state !== nextState;
    }
}