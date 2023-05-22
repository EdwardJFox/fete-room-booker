import nodemailer from "nodemailer";

if (process.env.NODE_ENV !== 'production') process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const emailProviderOptions = (): Record<string, unknown> => {
  if (process.env.NODE_ENV === "production") {
    return {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      },
    }
  } else {
    return {
      host: 'localhost',
      port: 8025,
    }
  }
}

const createTransport = () => {
  return nodemailer.createTransport(emailProviderOptions(), { from: process.env.EMAIL_FROM });
}

const mailer = globalThis.mailer || createTransport()
if (process.env.NODE_ENV !== "production") globalThis.mailer = mailer

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  let info = await mailer.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  return info;
}

export default mailer;