import { BaseSubscriberDep } from "../subTypes";

export default class Stay extends BaseSubscriberDep {
    publish(): void {
        document.body.addEventListener("tdStay", (e: Event) => {
            this.emit("report", e);
        });
    }
}
