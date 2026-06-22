import fs from "fs";
import getLatestVersion from "./getLatestVersion.js";

export default function resolveFolderName({ name, defaultFolerName }) {
    const v = getLatestVersion;
    defaultFolerName = v || "headerV1"
    // case 1: force new → timestamp
    if (name === null) {
        name = defaultFolerName;
    };

    // case 2: user provided → strict
    if (fs.existsSync(name)) {
        throw new Error(`Folder already exists: ${name}`);
    };

    return name;
};