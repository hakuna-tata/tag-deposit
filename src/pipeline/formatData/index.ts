import { Pipeline } from "../piplelineTypes";
import formatData from "../../events";

export default class FormatData extends Pipeline<Event> {
    step(e: Event): void {
        return formatData(e);
    }
}
