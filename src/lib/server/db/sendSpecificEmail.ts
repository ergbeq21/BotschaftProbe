import nodemailer from 'nodemailer';
import QRCode from 'qrcode'; 
import { db } from '.';
import { user } from './schema';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD
	}
});

const sendSpecificEmail = async () => {
	const users = await db
		.select({ email: user.email, besucher_id: user.besucher_id })
		.from(user)
		.execute();

	for (const userData of users) {
		const { email, besucher_id } = userData;

		const qrData = `https://botschaft.vercel.app/verify?id=${besucher_id}`;
		const qrCodeImage = await QRCode.toDataURL(qrData);

		const mailOptions = {
			from: 'Ambasada Austriake <ergitbeqiri07@gmail.com>',
			to: email,
			subject: 'Your Invitation with QR Code',
			html: `
				<p>Hello,</p>
				<p>Here is your unique QR code for the event:</p>
				<img src="${qrCodeImage}" alt="Your QR Code" />
				<p>Scan this at the entrance.</p>
				<p><a href="${qrData}">Or click here to verify</a></p>
			`
		};

		try {
			const info = await transporter.sendMail(mailOptions);
			console.log(`Email sent to ${email}:`, info.messageId);
		} catch (error) {
			console.error(`Error sending email to ${email}:`, error);
		}
	}
};

export { sendSpecificEmail };
