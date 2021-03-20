interface TdNodePath {
    el: Element;
    attrs: {
        appid?: string;
        pageid?: string;
        moduleid?: string;
        itemid?: string;
    };
}

enum ACTION_LEVEL {
    UNKNOW = 0,
    PAGE = 1,
    MODULE = 2,
    ITEM = 3,
}

const VALID_VTNODE = ["appid", "pageid", "moduleid", "itemid"];

export default class EventCompose {
    protected event: Event;
    protected nodePath: TdNodePath[] = [];

    constructor(e: Event) {
        this.event = e;
        this.nodePath = this.parseNodePath();
        console.log(this.nodePath);
    }

    private parseNodePath(): TdNodePath[] {
        const tdNodePath: TdNodePath[] = this.reduceEventTarget(this.event);
        return this.fixNodePath(tdNodePath);
    }

    private reduceEventTarget(e: Event): TdNodePath[] {
        let path: EventTarget[] = e["td-path"] || e["path"];
        // 过滤 html && document && window
        path = path.slice(0, -3);

        const result = path.reduce((prev: TdNodePath[], cur: EventTarget): TdNodePath[] => {
            if (cur instanceof Element) {
                const tdInfo = this.tdNodeInfo(cur);

                if (tdInfo !== null) {
                    prev.push(tdInfo);
                }

                return prev;
            }
        }, []);

        return result;
    }

    private tdNodeInfo(el: Element): TdNodePath {
        if (!(el instanceof Element)) return null;

        const attrs: NamedNodeMap = el.attributes;

        const node: TdNodePath = {
            el,
            attrs: {},
        };

        for (let i = 0, len = attrs.length; i < len; i++) {
            if (attrs[i].name.startsWith("td-")) {
                const attrName = attrs[i].name.substring(3);

                // 异常标注
                if (VALID_VTNODE.includes(attrName)) {
                    node.attrs[attrName] = attrs[i].value;
                }
            }
        }

        return Object.keys(node.attrs).length > 0 ? node : null;
    }

    private fixNodePath(tdNodePath: TdNodePath[]): TdNodePath[] {
        const index = tdNodePath.findIndex((node: TdNodePath) => {
            return node.attrs.appid;
        });

        const nodes: TdNodePath[] = tdNodePath.slice(0, index + 1);

        return nodes;
    }

    protected extraActionItem(): void {
        return EventCompose.nodePathAction();
    }

    static nodePathAction(): void {}
}
