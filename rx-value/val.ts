import RxValue from "./rx-value";
import {of, Observable, combineLatest} from "rxjs";
import {map} from "rxjs/operators";

export default function Val<T>(obj: any): RxValue<T> {
    const obsEntries = Object.entries(obj).map(toReactiveEntry);
    const source = combineLatest(obsEntries).pipe(
        map(entries => Object.fromEntries(entries))
    ) as Observable<any>;
    return new RxValue<T>(source);
}

function toReactiveEntry<V>([key, value]: [PropertyKey, V | RxValue<V>]): Observable<[PropertyKey, V]> {
    if (!(value instanceof RxValue)) return of([key, value]);
    return value.asObservable().pipe(
        map(val => ([key, val]))
    );
}
