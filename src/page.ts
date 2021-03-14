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

        const nodes: NodeList = document.querySelectorAll("[td-proid]");

        this.pathname = `${window.location.origin}${window.location.pathname}`;

        nodes.forEach((node: Element): void => {
            this.addPageInfo({
                proid: node.getAttribute("td-proid"),
                pageid: node.getAttribute("td-pageid") || this.pathname,
                node,
            });
        });
    }

    addPageInfo({ proid, pageid, node }: { proid: string; pageid: string; node: Element }): void {
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
}

export default Page;
