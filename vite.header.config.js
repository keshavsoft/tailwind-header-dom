import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let config;

if (process.env.VITE_DYNAMIC_BUILD === "true") {
    const templateVersion = process.env.VITE_TEMPLATE_VERSION;
    const minify = process.env.VITE_MINIFY === "true";
    const fileNameSuffix = minify ? "ksheader.min.js" : "ksheader.js";

    config = {
        build: {
            lib: {
                entry: "header.js",
                name: "KSHeader",
                formats: ["umd"],
                fileName: () => `${templateVersion}/${fileNameSuffix}`
            },
            minify: minify ? "esbuild" : false,
            outDir: "public",
            emptyOutDir: false
        }
    };
} else {
    // Parent orchestrator: Scan directories, generate files, run child build processes
    const binHeaderDir = path.resolve(__dirname, "bin/header");
    const versions = fs.readdirSync(binHeaderDir).filter(f => {
        return fs.statSync(path.join(binHeaderDir, f)).isDirectory() && /^v\d+$/.test(f);
    });

    const headerTempPath = path.resolve(__dirname, "header.js");

    try {
        for (const version of versions) {
            const templatesDir = path.join(binHeaderDir, version, "commands/header/template");
            if (!fs.existsSync(templatesDir)) continue;

            const templates = fs.readdirSync(templatesDir).filter(t => {
                return fs.statSync(path.join(templatesDir, t)).isDirectory() && /^v\d+$/.test(t);
            });

            for (const template of templates) {
                const templateNum = parseInt(template.slice(1));
                if (templateNum < 13) continue; // follow v13 and next

                const templateVersionName = `v${templateNum}`;
                const absoluteInitHeaderPath = path.resolve(binHeaderDir, version, "commands/header/template", template, "initHeader.js");

                if (!fs.existsSync(absoluteInitHeaderPath)) {
                    console.warn(`File not found: ${absoluteInitHeaderPath}`);
                    continue;
                }

                console.log(`Building dynamically for version ${templateVersionName} (${version} / ${template})...`);

                const relativeInitHeaderPath = "./" + path.relative(__dirname, absoluteInitHeaderPath).replace(/\\/g, "/");

                // Dynamically write header.js in the root folder
                const headerContent = `// Generated file - do not edit directly
import initHeader from "${relativeInitHeaderPath}";

(async () => {
    window.KSHeaderVersion = "${templateVersionName}";

    window.KSHeader = initHeader;
})();
`;
                fs.writeFileSync(headerTempPath, headerContent);

                // Run build for unminified version
                console.log(`  Generating unminified (ksheader.js)...`);
                execSync("npx vite build --config vite.header.config.js", {
                    env: {
                        ...process.env,
                        VITE_DYNAMIC_BUILD: "true",
                        VITE_TEMPLATE_VERSION: templateVersionName,
                        VITE_MINIFY: "false"
                    },
                    stdio: "inherit"
                });

                // Run build for minified version
                console.log(`  Generating minified (ksheader.min.js)...`);
                execSync("npx vite build --config vite.header.config.js", {
                    env: {
                        ...process.env,
                        VITE_DYNAMIC_BUILD: "true",
                        VITE_TEMPLATE_VERSION: templateVersionName,
                        VITE_MINIFY: "true"
                    },
                    stdio: "inherit"
                });
            }
        }
    } finally {
        // Clean up temporary header.js file
        if (fs.existsSync(headerTempPath)) {
            fs.unlinkSync(headerTempPath);
        }
    }

    console.log("Dynamic build completed successfully.");
    process.exit(0);
}

export default config;