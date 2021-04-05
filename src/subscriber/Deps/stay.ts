import { BaseSubscriberDep } from "../subTypes";
import { PageInfo } from "../../reportTypes";
import config from "../../config";
import pageInstance from "../../page";
import { Logger } from "../../logger";

const REPORT_STAY_INTERVAL = 1000;
const DEFAULT_MAX_INTERVAL = 10 * 1000;

export default class Stay extends BaseSubscriberDep {
    private startTime = 0;

    private stayCache: Record<string, Required<PageInfo>> = {};

    publish(): void {
        this.startTime = Date.now();

        document.body.addEventListener("tdStay", (e: Event) => {
            this.emit("report", e);
        });

        if (config.offStayMonitor === false) {
            this.calcStay();
        }
    }

    private calcStay(): void {
        setTimeout(() => {
            const pages = pageInstance.getVisiblePages();

            Logger.debug("页面停留检测的 pages", pages);

            const ids = pages.map((pi: PageInfo): string => {
                this.report(pi);

                return pi.id;
            });

            Object.keys(this.stayCache).forEach((id) => {
                if (!ids.includes(id)) {
                    this.stayCache[id] = null;
                }
            });

            this.calcStay();
        }, REPORT_STAY_INTERVAL);
    }

    private report(pi: PageInfo): void {
        const stayItem: Required<PageInfo> = {
            count: 0,
            time: 0,
            ...this.stayCache[pi.id],
        };

        const now = Date.now();

        if (now - stayItem.time < DEFAULT_MAX_INTERVAL) return;

        stayItem.count += 1;
        stayItem.time = now;

        this.stayCache[pi.id] = stayItem;

        pi.count = stayItem.count;
        pi.time = stayItem.time;

        const evt = new Event("tdStay", { bubbles: true });
        pi.node.dispatchEvent(evt);
    }
}
