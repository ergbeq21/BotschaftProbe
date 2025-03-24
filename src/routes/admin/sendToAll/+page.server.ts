
import { error } from '@sveltejs/kit';



export async function load({ locals }) {
    if (!locals.user || locals.user.role !== 'admin') {
        throw error(403, 'Access Denied, only admins have access to this site');
    }
    return {};
}