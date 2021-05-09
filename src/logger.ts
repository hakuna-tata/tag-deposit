import { ReportItem, PageInfo } from "./reportTypes";

type ItemType = ReportItem | PageInfo[] | Element;

export const Logger = {
    debug: (str: string, item: ItemType): void => {
        console.log(`%c ${str}:`, "color: #c09", item);
    },
    warn: (str: string): void => {
        console.log(`%c ${str}`, "color: #f66a0a");
    },
};
