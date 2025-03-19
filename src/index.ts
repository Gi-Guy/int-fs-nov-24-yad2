import { createServer } from "http";
import express from "express";
import { json } from "body-parser";
import { router as listingsRouter } from "./listings.controller";
import * as messagesController from "./messages";

const app = express();

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());

app.use("/listings", listingsRouter);

app.post("/users/:userId/messages", messagesController.create);

app.get("/users/:userId/messages", messagesController.list);

const server = createServer(app);

server.listen(8090, () => console.log("Server listening on port 8090"));
