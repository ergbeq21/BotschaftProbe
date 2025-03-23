import nodemailer from 'nodemailer';
import { db } from '.';
import { user } from './schema';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD
	}
});

const sendSpecificEmal = async () => {
	const results = await db.select({ email: user.email }).from(user).execute();
	const email = results.map((result) => result.email);

	const mailOptions = {
		from: 'Ambasada Austriake ergitbeqiri07@gmail.com',
		to: email,
		subject: 'Ftese per ne diten e pavarsise',
		text: `Hello, do you want to join our party!`,
		html: `<p>Go to our website: https://botschaft.vercel.app/</p>`
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

export { sendSpecificEmal };
