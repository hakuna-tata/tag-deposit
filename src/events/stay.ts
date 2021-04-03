import { PageInfo, ReportItem, ACT_ID } from "../reportTypes";
import EventCompose, { ACTION_LEVEL } from "./eventCompose";
import pageInstance from "../page";

export default class Stay extends EventCompose {
    compose(): ReportItem {
        const reportItem = this.extraReportItem();

        // 只有 page 支持停留检测行为
        if (reportItem.level !== ACTION_LEVEL.PAGE) return null;

        const page: PageInfo = pageInstance.getPage(reportItem.targetEl as Element);
        if (page) {
            reportItem.moreInfo = { ...page };
        }

        reportItem.type = ACT_ID.STAY;

        return reportItem;
    }
}
