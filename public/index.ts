export async function app(listings: HTMLUListElement) {
    const res = await fetch("/api/listings");
    const data = await res.json();

    listings.innerHTML = data
        .map((listing) => `<li><a href="/listing#${listing.id}">${listing.title}</a></li>`)
        .join("\n");
}
