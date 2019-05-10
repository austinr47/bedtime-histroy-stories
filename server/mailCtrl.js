const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
	mail: (req, res) => {
		const { name, email, message } = req.body;

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			secure: false,
			port: 3050,
			auth: {
				user: `${process.env.REACT_APP_GMAIL_ACCOUNT}`,
				pass: `${process.env.REACT_APP_GMAIL_PASSWORD}`
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		let HelperOptions = {
			from: 'Bedtime History Feedback',
			to: `${email}`,
			subject: 'Bedtime History Feedback',
			html:
                `<div> Name: ${name} <br/> Email: ${email} <br/> Message: ${message} </div>`
		};

		// send mail with defined transport object
		transporter.sendMail(HelperOptions, (error) => {
			if(error) {
				return console.log('this is an error ', error);  
			}
			return res.status(200).send('Thank you! We will be in contact with you soon.');
		});
	}
};