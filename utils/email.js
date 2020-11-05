const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {

	constructor (user , url) {
		this.from = `Login-Module <${process.env.EMAIL_FROM }>`;
		this.to = user.email;
		this.url = url;
	}

	transporter() {
		return nodemailer.createTransport({
			service: 'gmail' ,
			auth: {
				user: 'dhruwlalan19@gmail.com' ,
				pass: process.env.GMAIL_PASSWORD ,
			}
		});
	}
	
	async send () {
		const html = pug.renderFile(`${__dirname }/../views/resetPasswordEmail.pug` , {
			url: this.url ,
		});
		const mailOptions = {
			from: this.from ,
			to: this.to ,
			subject: 'Your password reset token (valid for 10 min)' ,
			html ,
			text: htmlToText.fromString(html) ,
		}
		await this.transporter().sendMail(mailOptions);
	}
}