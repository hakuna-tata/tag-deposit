import { BaseSubscriberDep } from "../subTypes";

export default class Expose extends BaseSubscriberDep {
    publish(): void {
        document.body.addEventListener("Expose", (e: Event) => {
            this.emit("report", e);
        });
    }
}
