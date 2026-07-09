import { } from "../../../../../bin/header/v5/commands/header/template/v13/initHeader.js";

import { buildHeader } from "./buildHeader.js";


const runAfterDomLoad = () => {
    buildHeader().then(fromPromise => {
    });


    // import("../../../script.js").then(fromPromise => {


    // });
};

export { runAfterDomLoad };
