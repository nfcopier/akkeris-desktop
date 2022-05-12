import {combineLatest, EMPTY, map, switchMap, of as rxOf} from "rxjs";
import RxValue from "./rx-value";

type Predicate<T> = (value: T) => RxValue<boolean>;

export default class RxList<T> extends RxValue<T[]> {

    public find(predicate: Predicate<T>): RxValue<T> {
        const newSource = this.filter(predicate).asObservable().pipe(
            map(values => values[0])
        );
        return new RxValue<T>(newSource);
    }

    public filter(predicate: Predicate<T>): RxList<T> {
        const newSource = this.asObservable().pipe(
            switchMap((values) => {
                if (values.length === 0) return EMPTY;
                return combineLatest(values.map(v => predicate(v).asObservable())).pipe(
                    map(booleans => values.filter((_, i) => booleans[i]))
                );
            })
        );
        return new RxList<T>(newSource);
    }

    public static ofValues<T>(value: T[]): RxList<T> {
        return new RxList(rxOf(value));
    }

}
