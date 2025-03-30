import path from "path";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "./routers/api";

export const app = express();

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.all("/login", (req, res, next) => {
    if (req.signedCookies.userId) {
        res.redirect("/");
        return;
    }

    next();
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email !== "omer@int.com" || password !== "Aa123456") {
        res.status(401);
        res.send("Wrong credentials");
        return;
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    res.cookie("userId", "f163bb29-6794-4e0d-9619-e2706a128d0b", {
        expires,
        signed: true,
        httpOnly: true,
    });

    res.end();
});

app.use("/api", apiRouter);
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use((_, res) => {
    res.redirect("404.html");
});
