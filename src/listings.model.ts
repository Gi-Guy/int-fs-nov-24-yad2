import * as path from "path";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";

type Listing = {
    id: string,
    createdAt: number,
    userId: string,
    title: string,
    description?: string,
    price: number,
};

const dataPath = path.join(__dirname, "..", "data", "listings.json");

let listings: Listing[] = load();

function load() {
    try {
        const raw = readFileSync(dataPath, "utf8");
        
        return JSON.parse(raw);
    } catch (error) {
        console.error(error);
        return [];
    }
}

function save() {
    return writeFile(dataPath, JSON.stringify(listings));
}

export function get() {
    return listings.slice();
}

type UpdateListingData = Omit<Listing, "id" | "createdAt">;

export function createOrUpdate(id: string, data: UpdateListingData) {
    const existingListing = listings.find((listing) => listing.id === id);

    if (existingListing) {
        existingListing.title = data.title;
        existingListing.description = data.description;
        existingListing.price = data.price;
    } else {
        listings.push({
            id,
            createdAt: Date.now(),
            ...data
        });
    }

    return save();
}

export function remove(id: string) {
    if (!listings.some((listing) => listing.id === id)) {
        throw new Error();
    }

    listings = listings.filter((listing) => listing.id !== id);

    return save();
}
