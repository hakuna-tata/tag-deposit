import { ISubscriberDep } from "./subTypes";
import Click from "./Deps/click";

type DepMap = { [K: string]: typeof ISubscriberDep };

const DEP_MAP: DepMap = {
    click: Click,
};

console.log(DEP_MAP);

export default class Subscriber {
    subscribe(): void {}
}
