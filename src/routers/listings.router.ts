import express from "express";
import * as model from "../listings.model";
import { authenticate } from "../middlewares/authenticate";
import { Listing } from "../models/listings.model";

export const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { search } = req.query;
        const listings = await Listing
            .find(
                { title: new RegExp(search?.toString() ?? "") },
                { _id: true, title: true },
            );

        res.json(listings);
    } catch (error) {
        console.error(error);

        res.status(500);
        res.send("Oops, something went wrong");
    }
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const listing = model.get().find((l) => l.id === id);

    if (!listing) {
        res.status(404);
        res.end();
        return;
    }

    res.json(listing);
});

router.put("/:id", authenticate, async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    await model.createOrUpdate(id, body);

    res.status(201);
    res.end();
});

router.delete("/:id", authenticate, async (req, res) => {
    const id = req.params.id;

    try {
        await model.remove(id);
    } catch {
        res.status(404);
        res.end();
        return;
    }

    res.status(204);
    res.end();
});