import pageInstance from "../page";
import { ReportItem } from "../monitorTypes";

interface TdNodePath {
    el: Element;
    attrs: {
        appid?: string;
        pageid?: string;
        moduleid?: string;
        itemid?: string;
    };
}

export enum ACTION_LEVEL {
    UNKNOW = 0,
    PAGE = 1,
    MODULE = 2,
    ITEM = 3,
}

const VALID_VTNODE = ["appid", "pageid", "moduleid", "itemid"];

export default class EventCompose {
    protected event: Event;
    protected targetEl: EventTarget;
    protected appNodePath: TdNodePath[] = [];
    protected appInfo: TdNodePath;

    constructor(e: Event) {
        this.event = e;
        this.targetEl = e.target;
        this.appNodePath = this.parseNodePath();
        this.appInfo = this.appNodePath[this.appNodePath.length - 1];
    }

    private parseNodePath(): TdNodePath[] {
        const tdNodePath: TdNodePath[] = this.reduceEventTarget(this.event);
        // 寻找离目标节点最近的 appid
        return this.fixTdNodePath(tdNodePath, "appid");
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

    private fixTdNodePath(tdNodePath: TdNodePath[], fixId: string): TdNodePath[] {
        const index = tdNodePath.findIndex((node: TdNodePath) => {
            return node.attrs[fixId];
        });

        const nodes: TdNodePath[] = tdNodePath.slice(0, index + 1);

        return nodes;
    }

    protected extraReportItem(): ReportItem {
        return this.nodePathAction(this.appNodePath);
    }

    private nodePathAction(tdNodePath: TdNodePath[]): ReportItem {
        const reportItem: ReportItem = {
            level: ACTION_LEVEL.UNKNOW,
            appEl: null,
            targetEl: null,
            group_id: pageInstance.groupId,
            app_id: "",
            page_id: "",
            module_id: "",
            item_id: "",
        };

        reportItem.appEl = this.appInfo.el;
        reportItem.targetEl = this.targetEl;
        reportItem.app_id = this.appInfo.attrs.appid;

        // 寻找离目标节点最近的 pageid
        const pageNodePath: TdNodePath[] = this.fixTdNodePath(tdNodePath, "pageid");

        // page 维度
        if (pageNodePath.length === 1) {
            reportItem.page_id = pageNodePath[0].attrs.pageid;

            reportItem.level = ACTION_LEVEL.PAGE;

            // module 维度
        } else if (pageNodePath.length === 2) {
            reportItem.page_id = pageNodePath[1].attrs.pageid;
            reportItem.module_id = pageNodePath[0].attrs.moduleid;

            reportItem.level = ACTION_LEVEL.MODULE;

            // item 维度
        } else if (pageNodePath.length === 3) {
            reportItem.page_id = pageNodePath[2].attrs.pageid;
            reportItem.module_id = pageNodePath[1].attrs.moduleid;
            reportItem.item_id = pageNodePath[0].attrs.itemid;

            reportItem.level = ACTION_LEVEL.ITEM;
        }

        return reportItem;
    }
}
