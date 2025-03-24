import { sendTestEmail } from '$lib/server/mailer';

export const actions = {
  sendEmail: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string | null; // Explicitly typed as string or null
    const userId = formData.get('userId') as string | null; // Explicitly typed as string or null

    if (!email || !userId) {
      return { error: 'Missing email or userId' };
    }

    try {
      // Ensure userId is a valid number
      const parsedUserId = parseInt(userId);
      if (isNaN(parsedUserId)) {
        return { error: 'Invalid userId' }; // Return an error if userId is not a valid number
      }

      // Sending email with the userId
      await sendTestEmail(email, parsedUserId);

      return { success: true };
    } catch (error) {
      // Provide more information about the error if available
      return { error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }
};
