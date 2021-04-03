export interface PageInfo {
    id: string;
    appid: string;
    pageid: string;
    node: Element;
    latestVisibleTime: number;
    visbleState: boolean;
    count?: number;
    time?: number;
}

export interface ReportItem {
    level: number;
    type: string;
    appEl?: Element;
    targetEl?: EventTarget;
    group_id?: string;
    app_id?: string;
    page_id?: string;
    module_id?: string;
    item_id?: string;
    moreInfo?: Partial<PageInfo>;
}

export enum ACT_TYPE {
    UNKNOW = 0,
    PROJECT = 1, // 项目
    PAGE = 2, // 页面
    MODULE = 3, // 模块
    ITEM = 4, // 模块子内容
}

export enum ACT_ID {
    CLICK = "click", // 点击
    EXPOSE = "expose", // 曝光
    STAY = "stay", // 停留
    CUSTOMIZE = "customize", // 自定义
}
