import {combineLatest, EMPTY, map, Observable} from "rxjs";
import {pluck} from "rxjs/operators";

export default class RxValue<T> {

    private readonly source: Observable<T> = EMPTY;

    public constructor(source: Observable<T>) {
        this.source = source;
    }

    public get(key: keyof T): RxValue<T[keyof T]> {
        const newSource = this.asObservable().pipe(
            pluck(key)
        );
        return new RxValue(newSource);
    }

    public equals(other: T | RxValue<T>): RxValue<boolean> {
        return (
            other instanceof RxValue ?
            this.equalsRxValue(other) :
            this.equalsConst(other)
        );
    }

    private equalsRxValue(other: RxValue<T>): RxValue<boolean> {
        const newSource = combineLatest([
            this.asObservable(),
            other.asObservable()
        ]).pipe(
            map(([thisVal, otherVal]) => thisVal === otherVal)
        );
        return new RxValue(newSource);
    }

    private equalsConst(otherVal: T): RxValue<boolean> {
        const newSource = this.asObservable().pipe(
            map(thisVal => thisVal === otherVal)
        );
        return new RxValue(newSource);
    }

    public notEquals(other: T | RxValue<T>): RxValue<boolean> {
        return (
            other instanceof RxValue ?
                this.notEqualsRxValue(other) :
                this.notEqualsConst(other)
        );
    }

    private notEqualsRxValue(other: RxValue<T>): RxValue<boolean> {
        const newSource = combineLatest([
            this.asObservable(),
            other.asObservable()
        ]).pipe(
            map(([thisVal, otherVal]) => thisVal !== otherVal)
        );
        return new RxValue(newSource);
    }

    private notEqualsConst(otherVal: T): RxValue<boolean> {
        const newSource = this.asObservable().pipe(
            map(thisVal => thisVal !== otherVal)
        );
        return new RxValue(newSource);
    }

    public asObservable(): Observable<T> {
        return this.source;
    }

}
