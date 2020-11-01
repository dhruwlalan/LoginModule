const nodemailer = require('nodemailer');

// const sendEmail = async options => {
// 	// 1. create a transporter:
// 	const transporter = nodemailer.createTransport({
// 		host: process.env.EMAIL_HOST ,
// 		port: process.env.EMAIL_PORT ,
// 		auth: {
// 			user: process.env.EMAIL_USERNAME ,
// 			pass: process.env.EMAIL_PASSWORD ,
// 		} ,
// 	});

// 	// 2. define the email options:
// 	const mailOptions = {
// 		from: 'dhruw <dhruwlalan22@gmail.com>' ,
// 		to: options.email ,
// 		subject: options.subject ,
// 		text: options.message ,
// 	}
	
// 	// 3. send the email:
// 	await transporter.sendMail(mailOptions);
// }

const sendEmail = async options => {
	// 1. create a transporter:
	const transporter = nodemailer.createTransport({
		service: 'gmail' ,
		auth: {
			user: 'dhruwlalan19@gmail.com' ,
			pass: process.env.GMAIL_PASSWORD ,
		}
	});

	// 2. define the email options:
	const mailOptions = {
		from: 'Login-Module <dhruwlalan19@gmail.com>' ,
		to: options.email ,
		subject: options.subject ,
		text: options.message ,
	}
	
	// 3. send the email:
	await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;