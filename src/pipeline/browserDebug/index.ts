import { Pipeline } from "../piplelineTypes";
import { ReportItem } from "../../reportTypes";
import { Logger } from "../../logger";

export default class BrowserDebug extends Pipeline<ReportItem> {
    step(item: ReportItem): void {
        Logger.debug("reportItem", item);
    }
}
