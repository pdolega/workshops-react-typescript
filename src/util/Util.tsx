import {List} from "immutable";
import * as _ from "lodash";

export class Util {
    public static update<E>(list: List<E>, finder: (e: E) => boolean, setter: (e: E) => void): List<E> {
        let index = list.findIndex(finder);
        let e = _.clone(list.get(index));
        setter(e);
        return list.set(index, e);
    }

    public static objChanged(prev: any, next: any, ...skipKeys: string[]): boolean {
        let prevNil = _.isNil(prev);
        let nextNil = _.isNil(next);
        if(prevNil && nextNil) {
            return false;
        } else if(prevNil !== nextNil) {
            return true;
        }

        let nextKeys = Object.keys(next);
        let lastKeys = Object.keys(prev);

        if (nextKeys.length === lastKeys.length) {
            return _.find(nextKeys, (key: string) => {
                    if (skipKeys.indexOf(key) >= 0) {
                        return false;
                    } else {
                        return next[key] !== prev[key];
                    }
                }) !== undefined;
        } else {
            return true;
        }
    }
}