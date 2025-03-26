const dateFormatter = new Intl.DateTimeFormat("he");

const title = getElementById("title");
const createdAt = getElementById("createdAt");
const description = getElementById("description");
const price = getElementById("price");

async function app() {
    const res = await fetch(`/api/listings/${window.location.hash.slice(1)}`);
    const listing = await res.json();

    document.title = `Yad2 - ${listing.title}`;
    title.textContent = listing.title;
    createdAt.setAttribute("datetime", listing.createdAt);
    createdAt.textContent = dateFormatter.format(listing.createdAt);
    description.textContent = listing.description ?? "N/A";
    price.textContent = listing.price;
}

app();

function getElementById(id: string) {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`#${id} not found`);
    }

    return element;
}
