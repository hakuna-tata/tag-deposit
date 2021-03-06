import { ReportItem, ACT_ID } from "../reportTypes";
import EventCompose, { ACTION_LEVEL } from "./eventCompose";

export default class Click extends EventCompose {
    compose(): ReportItem {
        const reportItem = this.extraReportItem();

        // 只有 item 支持点击行为
        if (reportItem.level !== ACTION_LEVEL.ITEM) return null;

        reportItem.type = ACT_ID.CLICK;

        return reportItem;
    }
}
