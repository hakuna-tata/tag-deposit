interface PageInfo {
    groupid: string;
    appid: string;
    pageid: string;
    timestamp: number;
    others: Record<string, string>;
}

class Track {
    private pageList: PageInfo[] = [];

    collect(): void {
        this.pageList = [];
    }
}

export default Track;
