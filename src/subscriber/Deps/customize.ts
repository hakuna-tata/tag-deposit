import { BaseSubscriberDep } from "../subTypes";

export default class Customize extends BaseSubscriberDep {
    publish(): void {
        document.body.addEventListener("tdCustomize", (e: Event) => {
            this.emit("report", e);
        });
    }
}
