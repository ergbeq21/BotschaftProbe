import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db/index.js";
import { user } from "$lib/server/db/schema.js";
import { eq, and } from "drizzle-orm";
import type { RequestEvent } from "@sveltejs/kit"; 

export async function POST({ request }: RequestEvent) {
    const { name } = await request.json();

    if (!name) {
        return json({ success: false, message: "No name provided" }, { status: 400 });
    }

    const [vorname, nachname] = name.split(" ");

    if (!vorname || !nachname) {
        return json({ success: false, message: "Invalid name format" }, { status: 400 });
    }

    const result = await db
        .select()
        .from(user)
        .where(and(eq(user.vorname, vorname), eq(user.nachname, nachname)));

    if (result.length > 0) {
        return json({ success: true, message: "User found", user: result[0] });
    } else {
        return json({ success: false, message: "User not found" }, { status: 404 });
    }
}
