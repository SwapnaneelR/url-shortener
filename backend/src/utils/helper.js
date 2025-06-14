import { nanoid } from "nanoid"

export const get = (length) => {
    return nanoid(length);
}