import { ISubscriberDep } from "../subTypes";

export default class Click extends ISubscriberDep {
    init(): void {
        this.subscribe();
        this.publish();
    }
    subscribe(): void {
        this.on("report", (e: Event) => {});
    }
    publish(): void {
        document.body.addEventListener("click", (e: Event) => {
            this.emit("report", e);
        });
    }
}
