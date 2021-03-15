import { BaseSubscriberDep } from "../subTypes";

export default class Customize extends BaseSubscriberDep {
    publish(): void {
        document.body.addEventListener("Customize", (e: Event) => {
            this.emit("report", e);
        });
    }
}
