import { templateVersion } from "./src/version.js";

export default {
    build: {
        lib: {
            entry: "src/header.js",
            name: "KSHeader",
            formats: ["umd"],
            fileName: () => `${templateVersion}/ksheader.js`
        },
        outDir: "public",
        emptyOutDir: false
    }
};