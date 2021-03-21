import { ReportItem } from "../monitorTypes";
import EventCompose, { ACTION_LEVEL } from "./eventCompose";

export default class Expose extends EventCompose {
    compose(): ReportItem {
        if (this.appNodePath.length === 0) return null;

        const reportItem = this.extraReportItem();

        if (reportItem.level === ACTION_LEVEL.UNKNOW) return null;

        if (reportItem.level === ACTION_LEVEL.PAGE) {
        }
        console.log(reportItem);
        return reportItem;
    }
}
