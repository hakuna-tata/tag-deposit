export const Logger = {
    color: (str: string): void => {
        console.log(`%c ${str}`, "color: #c09");
    },
    warn: (str: string, el?: Element): void => {
        console.log(`%c ${str}`, "color: red", el);
    },
};
