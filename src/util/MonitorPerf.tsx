import * as React from "react";
import * as ReactPerf from "react-addons-perf";

export class State {
    started: boolean = false;
}

export class MonitorPerf extends React.Component<void, State> {

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
        this.state.started = true;
        this.setState(this.state);
        ReactPerf.start();
    }

    private stopMeasurements(): void {
        this.state.started = false;
        this.setState(this.state);
        ReactPerf.stop();
        let measurments = ReactPerf.getLastMeasurements();
        ReactPerf.printWasted(measurments);
    }
}