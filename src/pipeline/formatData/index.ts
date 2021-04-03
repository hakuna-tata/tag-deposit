import { Pipeline } from "../piplelineTypes";
import formatData from "../../events";
import { ReportItem } from "../../reportTypes";

export default class FormatData extends Pipeline<Event> {
    step(e: Event): ReportItem {
        return formatData(e);
    }
}
