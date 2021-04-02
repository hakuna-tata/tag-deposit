import { ReportItem } from "./monitorTypes";

export const Logger = {
    tips: (str: string, item?: ReportItem | Element): void => {
        console.log(`%c ${str}:`, "color: #c09", item);
    },
};
