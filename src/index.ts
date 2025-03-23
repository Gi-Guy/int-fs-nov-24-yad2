import { createServer } from "http";
import path from "path";
import express from "express";
import { json } from "body-parser";
import { router as apiRouter } from "./routers/api";

const app = express();

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());

app.use("/api", apiRouter);
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use((_, res) => {
    res.redirect("404.html");
});

const server = createServer(app);

server.listen(8090, () => console.log("Server listening on port 8090"));