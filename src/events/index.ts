import EventCompose from "./eventCompose";
import Click from "./click";
import Expose from "./expose";
import { ReportItem } from "../monitorTypes";

type EventType = Click | Expose;
type EventsMap = { [K: string]: typeof EventCompose };

const EVENTS_MAP: EventsMap = {
    click: Click,
    tdExpose: Expose,
};

const getEventInstance = (e: Event): EventCompose => {
    if (EVENTS_MAP[e.type]) {
        return new EVENTS_MAP[e.type](e);
    }

    return null;
};

export default function formatData(e: Event): void {
    const eCompose: EventCompose = getEventInstance(e);

    if (eCompose === null) return null;

    const reportItem: ReportItem = (eCompose as EventType).compose();

    if (reportItem === null) return null;
}
