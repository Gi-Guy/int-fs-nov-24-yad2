import { randomUUID } from "crypto";
import { Handler } from "express";

type Message = {
    id: string,
    createdAt: number,
    from: string,
    to: string,
    content: string,
};

let messages: Message[] = [];

export const create: Handler = (req, res) => {
    const { userId } = req.params;

    messages.push({
        id: randomUUID(),
        createdAt: Date.now(),
        from: "currentUser",
        to: userId,
        content: req.body.content,
    });
    
    res.status(204);
    res.end();
};

export const list: Handler = (req, res) => {
    const { userId } = req.params;
    
    res.json(
        messages.filter((message) => message.to === userId),
    );
};
