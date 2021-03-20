export interface ActionItem {
    el?: Element;
    group_id?: string;
    pro_id?: string;
    module_id?: string;
    item_id?: string;
}

export enum ACT_TYPE {
    UNKNOW = 0,
    PROJECT = 1, // 项目
    PAGE = 2, // 页面
    MODULE = 3, // 模块
    ITEM = 4, // 模块子内容
}
