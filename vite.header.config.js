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
    // Parent orchestrator: Scan directories, determine latest version, check existence, and run child build processes
    const binHeaderDir = path.resolve(__dirname, "bin/header");
    
    // Find the highest version folder in bin/header (e.g. v5)
    const versions = fs.readdirSync(binHeaderDir)
        .filter(f => fs.statSync(path.join(binHeaderDir, f)).isDirectory() && /^v\d+$/.test(f))
        .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
    const maxVersionDir = versions.at(-1);

    if (!maxVersionDir) {
        console.error("No version folder found in bin/header");
        process.exit(1);
    }

    const templatesDir = path.join(binHeaderDir, maxVersionDir, "commands/header/template");
    if (!fs.existsSync(templatesDir)) {
        console.error(`Templates directory not found: ${templatesDir}`);
        process.exit(1);
    }

    // Find the highest template version folder (e.g. v14)
    const templates = fs.readdirSync(templatesDir)
        .filter(t => fs.statSync(path.join(templatesDir, t)).isDirectory() && /^v\d+$/.test(t))
        .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
    const maxTemplate = templates.at(-1);

    if (!maxTemplate) {
        console.error(`No templates found in ${templatesDir}`);
        process.exit(1);
    }

    const templateVersionName = `v${parseInt(maxTemplate.slice(1))}`;
    
    // Check if the latest version is already present in the public/ folder
    const targetPublicDir = path.join(__dirname, "public", templateVersionName);
    if (fs.existsSync(targetPublicDir)) {
        const existingFiles = fs.readdirSync(targetPublicDir).filter(f => !fs.statSync(path.join(targetPublicDir, f)).isDirectory());
        if (existingFiles.length > 0) {
            console.log(`\n[Info] The latest template version folder (${templateVersionName}) is already present in public:`);
            existingFiles.forEach(f => console.log(`  - ${f}`));
            console.log(`Aborting build as the latest version already exists.\n`);
            process.exit(0);
        }
    }

    const headerTempPath = path.resolve(__dirname, "header.js");

    try {
        const absoluteInitHeaderPath = path.resolve(binHeaderDir, maxVersionDir, "commands/header/template", maxTemplate, "initHeader.js");

        if (!fs.existsSync(absoluteInitHeaderPath)) {
            console.error(`File not found: ${absoluteInitHeaderPath}`);
            process.exit(1);
        }

        console.log(`Building dynamically for latest version ${templateVersionName} (${maxVersionDir} / ${maxTemplate})...`);

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