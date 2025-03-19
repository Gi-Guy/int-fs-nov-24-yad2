import express from "express";
import * as model from "./listings.model";

export const router = express.Router();

router.get("/", (req, res) => {
    const { search } = req.query;
    const result = model
        .get()
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

router.put("/:id", async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    await model.createOrUpdate(id, body);

    res.status(201);
    res.end();
});

router.delete("/:id", async (req, res) => {
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
