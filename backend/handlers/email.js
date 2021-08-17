const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const { promisify } = require('util');
require('dotenv').config({ path: 'variables.env' });

const transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	},
    secure: true
});


exports.sendMail = async (options) => {
	const mailOptions = {
		from: process.env.MAIL_USER,
		to: options.user.email,
		subject: options.subject,
		attachments: options.attachments,
        text: 'Your mission history!',
        html: '<b>Hey there! </b><br> Please view your csv data below:<br/>',
	};

	const sendMail = promisify(transport.sendMail).bind(transport);
	return sendMail(mailOptions);
};

