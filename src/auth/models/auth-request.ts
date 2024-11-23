import { Request } from "express";
import { User } from "src/users/entity/user.entity";

export interface AuthRequest extends Request{
    user:User;
}