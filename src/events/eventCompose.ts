import { ReportItem } from "../reportTypes";
import { Logger } from "../logger";
import config from "../config";

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
        // 寻找至目标节点最近的 appid
        return this.traceTdNodePath(tdNodePath, "appid");
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

    private traceTdNodePath(tdNodePath: TdNodePath[], traceId: string): TdNodePath[] {
        const targetInfo: TdNodePath = tdNodePath[0];

        const index = tdNodePath.findIndex((node: TdNodePath) => {
            return node.attrs[traceId];
        });

        const nodes: TdNodePath[] = tdNodePath.slice(0, index + 1);

        if (!nodes.length) {
            const curId = VALID_VTNODE.find((attr) => {
                return Object.keys(targetInfo.attrs).includes(attr);
            });

            Logger.warn(`td-${curId}: ${targetInfo.attrs[curId]} 没有对应的 td-${traceId}`);

            return [];
        }

        return nodes;
    }

    protected extraReportItem(): ReportItem {
        return this.nodePathAction(this.appNodePath);
    }

    private nodePathAction(tdNodePath: TdNodePath[]): ReportItem {
        const reportItem: ReportItem = {
            level: ACTION_LEVEL.UNKNOW,
            type: "",
            appEl: null,
            targetEl: null,
            group_id: config.groupid,
            app_id: "",
            page_id: "",
            module_id: "",
            item_id: "",
        };

        reportItem.appEl = this.appInfo.el;
        reportItem.targetEl = this.targetEl;
        reportItem.app_id = this.appInfo.attrs.appid;

        // 寻找至目标节点最近的 pageid
        const pageNodePath: TdNodePath[] = this.traceTdNodePath(tdNodePath, "pageid");

        // page 维度
        if (pageNodePath.length === 1) {
            reportItem.page_id = pageNodePath[0].attrs.pageid;

            reportItem.level = ACTION_LEVEL.PAGE;

            // module 维度
        } else if (pageNodePath.length === 2) {
            reportItem.page_id = pageNodePath[1].attrs.pageid;
            if (pageNodePath[0].attrs.moduleid) {
                reportItem.module_id = pageNodePath[0].attrs.moduleid;

                reportItem.level = ACTION_LEVEL.MODULE;
            } else {
                const targetInfo: TdNodePath = pageNodePath[0];
                Logger.warn(`td-itemid: ${targetInfo.attrs.itemid} 没有对应的 td-moduleid`);
            }
            // item 维度
        } else if (pageNodePath.length === 3) {
            reportItem.page_id = pageNodePath[2].attrs.pageid;

            if (pageNodePath[0].attrs.itemid && pageNodePath[1].attrs.moduleid) {
                reportItem.module_id = pageNodePath[1].attrs.moduleid;
                reportItem.item_id = pageNodePath[0].attrs.itemid;

                reportItem.level = ACTION_LEVEL.ITEM;
            } else {
                // TODO (detail info)
                Logger.warn("禁止 itemid 以及 moduleid 自身嵌套，或者互相嵌套");
            }
        } else if (pageNodePath.length > 3) {
            Logger.warn("禁止 itemid 以及 moduleid 自身嵌套，或者互相嵌套");
        }

        return reportItem;
    }
}
