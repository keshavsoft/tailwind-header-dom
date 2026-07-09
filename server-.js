import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const mime = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg"
};

http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url);
    let file;

    if (urlPath === "/") {
        file = path.join(root, "test/v1/index.html");
    } else {
        const testPath = path.join(root, "test/v1", urlPath);
        if (fs.existsSync(testPath) && !fs.statSync(testPath).isDirectory()) {
            file = testPath;
        } else {
            file = path.join(root, urlPath);
        }
    }

    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Not Found");
        }

        res.writeHead(200, {
            "Content-Type": mime[path.extname(file)] || "application/octet-stream"
        });

        res.end(data);
    });
}).listen(3000, () => {
    console.log("http://localhost:3000");
});