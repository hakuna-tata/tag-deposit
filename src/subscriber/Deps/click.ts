import { BaseSubscriberDep } from "../subTypes";

export default class Click extends BaseSubscriberDep {
    publish(): void {
        document.body.addEventListener("click", (e: Event) => {
            this.emit("report", e);
        });
    }
}
