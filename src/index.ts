import { randomUUID } from "crypto";
import { createServer } from "http";
import express from "express";

// UI - User Interface
// API - Application Programming Interface
// GET /listings?search=&status=&page= - list listings
// GET /listings/:id - get listing details
// PUT /listings/:id - create/update listing
// DELETE /listings/:id - delete listing

type Listing = {
    id: string,
    createdAt: number,
    title: string,
    description?: string,
    price: number,
};

let listings: Listing[] = [];

const app = express();

app.get("/listings", (_, res) => {
    res.json(listings);
});

app.put("/listings", (_, res) => {
    // get body
    listings.push({
        id: randomUUID(),
        createdAt: Date.now(),
        title: "Test listing",
        price: 500,
    });

    res.status(201);
    res.end();
});

app.delete("/listings/:id", (req, res) => {
    const id = req.params.id;

    if (!listings.some((listing) => listing.id === id)) {
        res.status(404);
        res.end();
        return;
    }

    listings = listings.filter((listing) => listing.id !== id);
    res.status(204);
    res.end();
});

const server = createServer(app);

server.listen(8090, () => console.log("Server listening on port 8090"));
