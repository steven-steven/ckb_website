require('dotenv').config();
const nodemailer = require('nodemailer');
const PWD = process.env.password

export default function contact(req, res) {
  // smtp information
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'dwiprimawebsite@gmail.com',
      pass: PWD,
    },
    secure: true,
  });

  const mailData = {
    from: 'dwiprimakaryaguna@gmail.com',
    to: 'steven.infinity29@gmail.com',
    subject: `${req.body.subject}`,
    text: req.body.message,
    html: `<div>
      (Dari CKB)\n
      Name: ${req.body.name}\n
      Company: ${req.body.company}\n
      Phone: ${req.body.phoneNumber}\n
      Email: ${req.body.email}\n
      Subject: ${req.body.subject}\n
      ${req.body.message}
    </div>`
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err){
      console.error(err);
    }
    else{
      console.log(info)
    }
  })
  console.log('replying');

  res.status(200).send('Message Sent!');
}