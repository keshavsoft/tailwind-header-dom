import http from "http";

export default function startServer(app) {
    const port = 9012;
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });

    return { port }; // 👈 add this
};