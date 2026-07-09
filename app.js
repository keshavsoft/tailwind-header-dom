import express from "express";

import setupRoutes from "./routes.js";
import startServer from "./server.js";

const app = express();

setupRoutes(app);

startServer(app);
