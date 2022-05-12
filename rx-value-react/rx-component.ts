import * as React from "react";
import RxValue from "../rx-value/rx-value";
import {Subscription} from "rxjs";

export default abstract class RxComponent<Props, State> extends React.Component<Props, State> {

    private subscription: Subscription;

    public componentDidMount(): void {
        const state = this.configureState();
        this.reactTo(state);
    }

    public componentWillUnmount(): void {
        this.subscription.unsubscribe();
    }

    private reactTo(state: RxValue<State>): void {
        this.subscription = state.asObservable().subscribe(this.setState.bind(this));
    }

    protected abstract configureState(): RxValue<State>;

}
