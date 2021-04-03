import { ReportItem, PageInfo } from "./reportTypes";

type ItemType = ReportItem | PageInfo[] | Element;

export const Logger = {
    debug: (str: string, item?: ItemType): void => {
        console.log(`%c ${str}:`, "color: #c09", item);
    },
};
