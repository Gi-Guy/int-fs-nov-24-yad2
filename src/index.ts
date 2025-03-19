import { randomUUID } from "crypto";
import { createServer } from "http";
import express from "express";
import { json } from "body-parser";

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

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());

app.get("/listings", (req, res) => {
    const { search } = req.query;
    const result = listings
        .filter(({ title, description }) =>
            typeof search !== "string" ||
            title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            description && description.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
        .map(({ id, title }) => ({
            id,
            title,
        }));

    res.json(result);
});

app.get("/listings/:id", (req, res) => {
    const { id } = req.params;
    const listing = listings.find((l) => l.id === id);

    if (!listing) {
        res.status(404);
        res.end();
        return;
    }

    res.json(listing);
});

type UpdateListingBody = Omit<Listing, "id" | "createdAt">;

app.put("/listings/:id", (req, res) => {
    const body = req.body as UpdateListingBody;
    const { id } = req.params;
    const existingListing = listings.find((listing) => listing.id === id);

    if (existingListing) {
        existingListing.title = body.title;
        existingListing.description = body.description;
        existingListing.price = body.price;
    } else {
        listings.push({
            id,
            createdAt: Date.now(),
            ...body
        });
    }

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
