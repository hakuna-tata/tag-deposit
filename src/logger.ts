import { ReportItem } from "./reportTypes";
import { PageInfo } from "./page";

type ItemType = ReportItem | PageInfo[] | Element;

export const Logger = {
    debug: (str: string, item?: ItemType): void => {
        console.log(`%c ${str}:`, "color: #c09", item);
    },
};
