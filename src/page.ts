import { Logger } from "./logger";
interface PageInfo {
    groupid: string;
    proid: string;
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
                proid: this.getProId(node),
                pageid: pageid || this.pathname,
                node,
            });
        });
    }

    getProId(elm: Element): string {
        let res = "";
        while (elm.tagName !== "HTML") {
            if (elm.getAttribute("td-proid")) {
                res = elm.getAttribute("td-proid");
                break;
            }
            (elm as ParentNode) = elm.parentNode;
        }

        return res;
    }

    addPageInfo({ proid, pageid, node }: { proid: string; pageid: string; node: Element }): void {
        if (proid === "") {
            Logger.warn(`warn => td-pageid: ${pageid} 没有对应的 td-proid`);
            return;
        }

        const pi: PageInfo = {
            groupid: this.groupid,
            proid,
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
