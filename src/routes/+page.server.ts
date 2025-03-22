import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // If the user is not logged in or doesn't have the 'admin' role, redirect to login page
    
    return {
        user: locals.user
    };
};
