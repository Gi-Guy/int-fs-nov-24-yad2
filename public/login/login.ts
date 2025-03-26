export async function login(e: SubmitEvent) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(formElement));

    const res = await fetch("/login", {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.status !== 200) {
        console.error("something went wrong");
        return;
    }

    window.location.replace("/");
}