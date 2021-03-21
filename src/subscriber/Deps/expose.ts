import { BaseSubscriberDep } from "../subTypes";

export default class Expose extends BaseSubscriberDep {
    publish(): void {
        document.body.addEventListener("tdExpose", (e: Event) => {
            this.emit("report", e);
        });
    }
}
