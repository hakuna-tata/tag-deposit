import { Logger } from "./logger";
export interface PageInfo {
    id: string;
    appid: string;
    pageid: string;
    node: Element;
    timestamp: number;
    visbleState: boolean;
    othersInfo: Record<string, string>;
}

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
            timestamp: Date.now(),
            visbleState: false,
            othersInfo: {},
        };
        this.pageInfo.push(pi);
    }

    getVisiblePages(): PageInfo[] {
        if (this.pageVisible === false) return [];

        return this.pageInfo.filter((pi: PageInfo): boolean => pi.visbleState);
    }
}

export default new Page();
