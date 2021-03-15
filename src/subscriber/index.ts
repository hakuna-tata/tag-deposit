import { BaseSubscriberDep } from "./subTypes";
import Click from "./Deps/click";
import Customize from "./Deps/customize";

type DepsMap = { [K: string]: typeof BaseSubscriberDep };

const DEP_MAP: DepsMap = {
    click: Click,
    customize: Customize,
};

export default class Subscriber {
    private Deps: DepsMap = {};

    subscribe(): void {
        Object.entries(DEP_MAP).forEach(([key, Dep]) => {
            const dep = new Dep();

            dep.on("report", (e: Event) => {
                if (e.composedPath) {
                    e["td-path"] = e.composedPath();
                }
            });

            dep.publish();

            this.Deps[key] = Dep;
        });
    }
}
