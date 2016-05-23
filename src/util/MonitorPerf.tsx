import * as React from "react";
import * as ReactPerf from "react-addons-perf";
import {PureComponent} from "./PureComponent";

export class State {
    started: boolean = false;
}

export class MonitorPerf extends PureComponent<void, State> {

    constructor() {
        super();
        this.state = new State();

        this.startMeasurement = this.startMeasurement.bind(this);
        this.stopMeasurements = this.stopMeasurements.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div>
                <button type="button" onClick={this.startMeasurement} disabled={this.state.started}>Start</button>
                <button type="button" onClick={this.stopMeasurements} disabled={!this.state.started}>Stop</button>
            </div>
        );
    }

    private startMeasurement(): void {
        this.setState({started: true});
        ReactPerf.start();
    }

    private stopMeasurements(): void {
        this.setState({started: false});
        ReactPerf.stop();
        let measurments = ReactPerf.getLastMeasurements();
        ReactPerf.printWasted(measurments);
    }
}