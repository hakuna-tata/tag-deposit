export interface PageConfig {
    groupid: string;
    /**
     * 关闭自动检测DOM变更
     */
    offAutoMonitor: boolean;

    /**
     * 关闭页面停留检测
     */
    offStayMonitor: boolean;
}

const buildConfig = (): PageConfig => {
    return {
        groupid: document.body.getAttribute("td-groupid") || "",
        offAutoMonitor: document.body.getAttribute("td-offAM") === "1",
        offStayMonitor: document.body.getAttribute("td-offSM") === "1",
    };
};

export default buildConfig();
