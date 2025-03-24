import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD
	}
});

const sendTestEmail = async (email: string, besucherId: number) => {
	const baseUrl = 'https://botschaft.vercel.app/admin/update-choice'; // Ensure the route matches
	const yesLink = `${baseUrl}?besucher_id=${besucherId}&choice=yes`; // Updated to besucher_id
	const noLink = `${baseUrl}?besucher_id=${besucherId}&choice=no`; // Updated to besucher_id

	const mailOptions = {
		from: `"Ambasada Austriake" <${process.env.GMAIL_USER}>`,
		to: email,
		subject: 'Ftesë për Ditën e Pavarësisë',
		html: `
      <p>Do you want to join our party?</p>
      <a href="${yesLink}" style="padding: 10px; background: green; color: white; text-decoration: none; border-radius: 5px;">Yes ✅</a>
      <a href="${noLink}" style="padding: 10px; background: red; color: white; text-decoration: none; border-radius: 5px; margin-left: 10px;">No ❌</a>
      <p>Or visit our website: <a href="https://botschaft.vercel.app/">Click here</a></p>
    `
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent:', info.messageId);
		return info;
	} catch (error) {
		console.error('Error while sending email:', error);
		throw error;
	}
};

export { sendTestEmail };
