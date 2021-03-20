import { Logger } from "./logger";
interface PageInfo {
    groupid: string;
    appid: string;
    pageid: string;
    node: Element;
    timestamp: number;
    othersInfo: Record<string, string>;
}

class Page {
    private groupid = "";
    private pathname = "";
    private pageInfo: PageInfo[] = [];

    init(): void {
        this.groupid = document.body.getAttribute("td-groupid");

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
            Logger.warn(`warn => td-pageid: ${pageid} 没有对应的 td-appid`);
            return;
        }

        const pi: PageInfo = {
            groupid: this.groupid,
            appid,
            pageid,
            node,
            timestamp: Date.now(),
            othersInfo: {},
        };
        this.pageInfo.push(pi);
    }

    get pageNum(): number {
        return this.pageInfo.length;
    }

    getPage(): void {}
}

export default new Page();
