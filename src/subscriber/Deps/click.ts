import { ISubscriberDep } from "../subTypes";

export default class Click extends ISubscriberDep {
    publish(): void {
        document.body.addEventListener("click", () => {
            this.emit("report");
        });
    }
}
