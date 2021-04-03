import { BaseSubscriberDep } from "../subTypes";
import config from "../../config";
import pageInstance, { PageInfo } from "../../page";
import { Logger } from "../../logger";
import page from "../../page";

const REPORT_STAY_INTERVAL = 1000;
const DEFAULT_MAX_INTERVAL = 10 * 1000;

interface ReportCacheItem {
    count: number;
    time: number;
}

export default class Stay extends BaseSubscriberDep {
    private startTime = 0;

    private reportCache: Record<string, ReportCacheItem> = {};

    publish(): void {
        this.startTime = Date.now();

        document.body.addEventListener("tdStay", (e: Event) => {
            this.emit("report", e);
        });

        if (config.stayAutoMonitor === true) {
            this.calcStay();
        }
    }

    private calcStay(): void {
        setTimeout(() => {
            const pages = pageInstance.getVisiblePages();

            Logger.debug("stayPage", pages);
            const ids = pages.map((pi: PageInfo): string => {
                this.report(pi);

                return pi.id;
            });

            Object.keys(this.reportCache).forEach((id) => {
                if (!ids.includes(id)) {
                    this.reportCache[id] = null;
                }
            });

            // this.calcStay();
        }, REPORT_STAY_INTERVAL);
    }

    private report(pi: PageInfo): void {
        const reportItem: ReportCacheItem = {
            count: 0,
            time: 0,
            ...this.reportCache[pi.id],
        };

        const now = Date.now();

        if (now - reportItem.time < DEFAULT_MAX_INTERVAL) return;

        const evt = new Event("tdStay", { bubbles: true });
        pi.node.dispatchEvent(evt);

        reportItem.count += 1;
        reportItem.time = now;
        this.reportCache[pi.id] = reportItem;
    }
}
