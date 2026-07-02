import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { templateVersion } from "./src/version.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let config;

if (process.env.VITE_DYNAMIC_BUILD === "true") {
    config = {
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
} else {
    // Parent orchestrator: Scan directories, generate files, run child build processes
    const binHeaderDir = path.resolve(__dirname, "bin/header");
    const versions = fs.readdirSync(binHeaderDir).filter(f => {
        return fs.statSync(path.join(binHeaderDir, f)).isDirectory() && /^v\d+$/.test(f);
    });

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
            const initHeaderPath = `../bin/header/${version}/commands/header/template/${template}/initHeader.js`;
            const absoluteInitHeaderPath = path.resolve(binHeaderDir, version, "commands/header/template", template, "initHeader.js");

            if (!fs.existsSync(absoluteInitHeaderPath)) {
                console.warn(`File not found: ${absoluteInitHeaderPath}`);
                continue;
            }

            console.log(`Building dynamically for version ${templateVersionName} (${version} / ${template})...`);

            // Dynamically write src/version.js
            const versionContent = `// Generated file - do not edit directly\nexport const templateVersion = "${templateVersionName}";\n`;
            fs.writeFileSync(path.resolve(__dirname, "src/version.js"), versionContent);

            // Dynamically write src/header.js
            const headerContent = `// Generated file - do not edit directly
import initHeader from "${initHeaderPath}";

(async () => {
    window.KSHeaderVersion = "${templateVersionName}";

    window.KSHeader = initHeader;
})();
`;
            fs.writeFileSync(path.resolve(__dirname, "src/header.js"), headerContent);

            // Run sub-build process
            execSync("npx vite build --config vite.header.config.js", {
                env: {
                    ...process.env,
                    VITE_DYNAMIC_BUILD: "true"
                },
                stdio: "inherit"
            });
        }
    }

    // Restore baseline version (v13)
    const baselineVersion = "v13";
    const baselineHeaderPath = `../bin/header/v5/commands/header/template/v13/initHeader.js`;
    
    fs.writeFileSync(path.resolve(__dirname, "src/version.js"), `export const templateVersion = "${baselineVersion}";\n`);
    fs.writeFileSync(path.resolve(__dirname, "src/header.js"), `import initHeader from "${baselineHeaderPath}";\n\n(async () => {\n    window.KSHeaderVersion = "${baselineVersion}";\n\n    window.KSHeader = initHeader;\n})();\n`);

    console.log("Dynamic build completed successfully.");
    process.exit(0);
}

export default config;