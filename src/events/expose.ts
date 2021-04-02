import { ReportItem, ACT_ID } from "../monitorTypes";
import EventCompose, { ACTION_LEVEL } from "./eventCompose";

export default class Expose extends EventCompose {
    compose(): ReportItem {
        if (this.appNodePath.length === 0) return null;

        const reportItem = this.extraReportItem();

        if (reportItem.level === ACTION_LEVEL.UNKNOW) return null;

        reportItem.type = ACT_ID.EXPOSE;

        return reportItem;
    }
}
