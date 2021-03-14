import { ISubscriberDep } from "../subTypes";

export default class Customize extends ISubscriberDep {
    init(): void {
        this.subscribe();
        this.publish();
    }
    subscribe(): void {
        this.on("report", (e: Event) => {});
    }
    publish(): void {
        document.body.addEventListener("Customize", (e: Event) => {
            this.emit("report", e);
        });
    }
}
