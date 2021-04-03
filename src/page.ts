import { PageInfo } from "./reportTypes";
import { Logger } from "./logger";

class Page {
    private pageVisible = true;
    private pathname = "";
    private pageInfo: PageInfo[] = [];

    constructor() {
        this.pageMinitor();
    }

    private pageMinitor(): void {
        document.addEventListener("visibilitychange", () => {
            this.pageVisible = !document.hidden;
        });
    }

    init(): void {
        const nodes: NodeList = document.querySelectorAll("[td-pageid]");

        this.pathname = `${window.location.origin}${window.location.pathname}`;

        nodes.forEach((node: Element): void => {
            const pageid: string = node.getAttribute("td-pageid");
            this.addPageInfo({
                appid: this.getAppId(node),
                pageid: pageid || this.pathname,
                node,
            });
        });
    }

    getAppId(elm: Element): string {
        let res = "";
        while (elm.tagName !== "HTML") {
            if (elm.getAttribute("td-appid")) {
                res = elm.getAttribute("td-appid");
                break;
            }
            (elm as ParentNode) = elm.parentNode;
        }

        return res;
    }

    addPageInfo({ appid, pageid, node }: { appid: string; pageid: string; node: Element }): void {
        if (appid === "") {
            Logger.debug(`warn => td-pageid: ${pageid} 没有对应的 td-appid`);
            return;
        }

        const pi: PageInfo = {
            id: String(Date.now() + Math.floor(Math.random() * 1000)),
            appid,
            pageid,
            node,
            latestVisibleTime: Date.now(),
            visbleState: false,
        };
        this.pageInfo.push(pi);
    }

    getVisiblePages(): PageInfo[] {
        if (this.pageVisible === false) return [];

        return this.pageInfo.filter((pi: PageInfo): boolean => pi.visbleState);
    }

    getPage(id: string | Element): PageInfo {
        return this.pageInfo.find((pi: PageInfo): boolean => {
            return typeof id === "string" ? pi.id === id : pi.node.isSameNode(id);
        });
    }

    updatePageVisible(id: string | Element, visible: boolean): PageInfo {
        const page = this.getPage(id);

        if (!page) return;
        // 最新可见时间
        if (visible && page.visbleState === false) {
            page.latestVisibleTime = Date.now();
        }

        page.visbleState = visible;
    }
}

export default new Page();
