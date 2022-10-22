import nodemailer from "nodemailer";

export const emailProviderOptions = (): any => {
  if (process.env.NODE_ENV === "production") {
    return {
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }
  } else {
    return {
      server: {
        host: 'localhost',
        port: 8025,
      },
      from: process.env.EMAIL_FROM
    }
  }
}

const createTransport = () => {
  return nodemailer.createTransport(emailProviderOptions());
}

const mailer = globalThis.mailer || createTransport()
if (process.env.NODE_ENV !== "production") globalThis.mailer = mailer

export const sendEmail = async (to, subject, text, html) => {
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