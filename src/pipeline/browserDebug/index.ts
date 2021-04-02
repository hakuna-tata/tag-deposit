import { Pipeline } from "../piplelineTypes";
import { ReportItem } from "../../monitorTypes";
import { Logger } from "../../logger";

export default class BrowserDebug extends Pipeline<ReportItem> {
    step(item: ReportItem): void {
        Logger.tips("reportItem", item);
    }
}
