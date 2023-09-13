import { Request } from "express";

export interface ExtendedRequest extends Request {
    user?: {
        id: number;
        email: string;
        nick: string;
    };
}