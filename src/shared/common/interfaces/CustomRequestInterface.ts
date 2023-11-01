import { Request } from "express";

interface CustomRequest extends Request {
    userId: number;
    email: string;
    admin?: boolean;
}

export default CustomRequest;