"use server";
import { cookies } from "next/headers";

const CookieStore = async (name: string) => {
    const cookieStore = await cookies();

    if (cookieStore) {
        const tokenCookie = cookieStore.get(name);
        return tokenCookie?.value;
    }
    return "";
}

export default CookieStore;