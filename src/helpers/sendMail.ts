import { Customer, Services } from '@prisma/client';
import nodemailer from 'nodemailer';

type mailInputProps = {
  service: Services | null;
  customer: Customer | null;
  time: string | null;
  date: string | null;
};
export const sendMailToCustomer = async ({
  service,
  customer,
  time,
  date,
}: mailInputProps) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'azimchy994@gmail.com',
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'auto-medics@gmail.com',
    to: 'faijul.azim.360@gmail.com',
    subject: `${service?.name} is booked on Auto-Medics`,
    text: `Hello ${customer?.name}, ${service?.name} is booked for you on ${date} and ${time} within the cost of $ ${service?.price}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const sendMailToSpecialist = async ({
  service,
  customer,
  time,
  date,
}: mailInputProps) => {
  //   await console.log(service, customer, time, date);
};
