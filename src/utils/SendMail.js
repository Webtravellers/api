import sgMail from "@sendgrid/mail"


sgMail.setApiKey("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")
const sendMail = (receiver, source, subject, content) => {
    try {
        const data = {
            to: receiver,
            from: source,
            subject,
            html: content
        };
        return sgMail.send(data)
    } catch (error) {
        return new Error(error)
    }
}

export default sendMail