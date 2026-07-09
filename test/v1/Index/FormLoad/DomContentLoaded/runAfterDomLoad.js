import { buildHeader } from "./buildHeader.js";

const runAfterDomLoad = () => {
    import("../../../script.js").then(fromPromise => {

        buildHeader().then(fromPromise => {
        });

    });
};

export { runAfterDomLoad };
