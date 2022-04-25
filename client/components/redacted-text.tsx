import * as React from "react";

const HIDDEN = "hidden";
const SHOWN = "shown";

type RedactedState = {
    state: typeof HIDDEN | typeof SHOWN
}

export default class RedactedText extends React.Component<{}, RedactedState> {

    public state: RedactedState = {state: HIDDEN};

    render(): JSX.Element {
        console.log(this.state);
        return this.state.state === HIDDEN ? this.hiddenText() : this.shownText();
    }

    private hiddenText() {
        return <div className={"button"} onClick={() => this.setState({state: SHOWN})}>
            &lt;redacted&gt;
        </div>;
    }

    private shownText() {
        return <div className={"button"} onClick={() => this.setState({state: HIDDEN})}>
            {this.props.children}
        </div>;
    }
}
