import { ISubscriberDep } from "./subTypes";
import Click from "./Deps/click";
import Customize from "./Deps/customize";

type DepMap = { [K: string]: typeof ISubscriberDep };

const DEP_MAP: DepMap = {
    click: Click,
    customize: Customize,
};

export default class Subscriber {
    private Deps: { [K: string]: ISubscriberDep } = {};

    subscribe(): void {
        Object.entries(DEP_MAP).forEach(([key, Dep]) => {
            const dep = new Dep();

            dep.init.bind(dep);

            this.Deps[key] = Dep;
        });
    }
}
