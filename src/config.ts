export interface PageConfig {
    /**
     * 是否自动检测DOM变更
     */
    domAutoMonitor: boolean;

    /**
     * 是否开启页面停留检测
     */
    stayAutoMonitor: boolean;
}

const buildConfig = (): PageConfig => {
    return {
        domAutoMonitor: document.body.getAttribute("td-domAM") !== "1",
        stayAutoMonitor: document.body.getAttribute("td-stayAM") !== "1",
    };
};

export default buildConfig();
