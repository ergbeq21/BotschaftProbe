import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db/index";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestEvent } from "@sveltejs/kit";

export async function POST({ request }: RequestEvent) {
    const { name } = await request.json();

    if (!name) {
        return json({ success: false, message: "No name provided" }, { status: 400 });
    }

    // Only use the first part of the name (first name)
    const vorname = name.split(" ")[0];

    if (!vorname) {
        return json({ success: false, message: "Invalid name format" }, { status: 400 });
    }

    const result = await db
        .select()
        .from(user)
        .where(eq(user.vorname, vorname)); // Only check for 'vorname'

    if (result.length > 0) {
        return json({ success: true, message: "User found", user: result[0] });
    } else {
        return json({ success: false, message: "User not found" }, { status: 404 });
    }
}
