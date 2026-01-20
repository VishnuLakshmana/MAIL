import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (mail) => {
    const msg = {
        to: mail.to,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
    };

    await sgMail.send(msg);
};

export default sendEmail;
