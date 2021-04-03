import { ReportItem, ACT_ID } from "../reportTypes";
import EventCompose, { ACTION_LEVEL } from "./eventCompose";

export default class Stay extends EventCompose {
    compose(): ReportItem {
        const reportItem = this.extraReportItem();

        if (reportItem.level !== ACTION_LEVEL.PAGE) return null;

        reportItem.type = ACT_ID.STAY;

        return reportItem;
    }
}
