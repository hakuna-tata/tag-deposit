import { BaseSubscriberDep } from "./subTypes";
import { Pipeline } from "../pipeline/piplelineTypes";
import Click from "./Deps/click";
import Customize from "./Deps/customize";
import Expose from "./Deps/expose";

type DepsMap = { [K: string]: typeof BaseSubscriberDep };

const DEP_MAP: DepsMap = {
    click: Click,
    customize: Customize,
    expose: Expose,
};

export default class Subscriber extends Pipeline<Event> {
    private Deps: DepsMap = {};

    subscribe(): void {
        Object.entries(DEP_MAP).forEach(([key, Dep]) => {
            const dep = new Dep();

            dep.on("report", (e: Event) => {
                if (e.composedPath) {
                    e["td-path"] = e.composedPath();
                }
                // 触发流水线
                this.trigger(e);
            });

            dep.publish();

            this.Deps[key] = Dep;
        });
    }

    step(e: Event): Event {
        return e;
    }
}
