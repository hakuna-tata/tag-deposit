import { Pipeline } from "../piplelineTypes";

export default class FormatData extends Pipeline<Event> {
    step(e: Event): void {
        this.format(e);
    }

    format(e: Event) {
        console.log(e);
    }
}
