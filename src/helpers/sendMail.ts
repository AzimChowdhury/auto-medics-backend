import { Admin, Customer, Services, Specialist } from '@prisma/client';
import nodemailer from 'nodemailer';

type mailInputProps = {
  service: Services | null;
  customer: Customer | null;
  specialist?: Specialist | null;
  admins?: Admin[] | null;
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
      user: process.env.GOOGLE_AUTH,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'auto-medics@gmail.com',
    to: ` ${customer?.email}`,
    subject: `${service?.name} is booked on Auto-Medics`,
    html: `
    <html>
    <body>
      <h1   style="font-size:30px ; padding: 0 3px; font-weight:700; text-align:center; 
            color: #2387fa;">Welcome to Auto-Medics</h1>
      <p  style="font-size:20px ; padding: 0 3px;">Hello <span style="color:#2387fa;">${customer?.name}</span>,</p>
      <p   style="font-size:20px ; padding: 0 3px;"> <span style="color:#2387fa;">${service?.name}</span> is booked for you on <span style="color:#2387fa;"> ${date} and ${time} </span> within the cost of <span style="color:#2387fa;"> $${service?.price} </span></p>
       <p   style="font-size:20px ; padding: 0 3px;">Hope your experience in Auto-Medics will be fantastic. After receiving the service dont't forget to give review and post your valuable comment. It will help us to improve ourselves. </p>
      <p    style="font-size:20px ; padding: 0 3px;">
       <p  style="font-size:20px ; "> Best Wishes, </p>
       <p  style="font-size:20px ; ">Admin, </p>
       <p  style="font-size:20px ; "> Auto-Medics Ltd.</p>
      </p>
    </body>
  </html>
    `,
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
  specialist,
  time,
  date,
}: mailInputProps) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_AUTH,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'auto-medics@gmail.com',
    to: ` ${specialist?.email}`,
    subject: `${service?.name} is booked on Auto-Medics`,
    html: `
    <html>
    <body>
      <h1   style="font-size:30px ; padding: 0 3px; font-weight:700; text-align:center; 
            color: #2387fa;">New work for you</h1>
      <p  style="font-size:20px ; padding: 0 3px;">Hello <span style="color:#2387fa;">${specialist?.name}</span>,</p>
      <p   style="font-size:20px ; padding: 0 3px;"> <span style="color:#2387fa;">${service?.name}</span> is booked by <span style="color:#2387fa;"> ${customer?.name} </span>  on <span style="color:#2387fa;"> ${date} and ${time} </span> which service is provided by you.</p>
       <p   style="font-size:20px ; padding: 0 3px;">Do your job properly and try to give best services to the user. </p>
      <p    style="font-size:20px ; padding: 0 3px;">
       <p  style="font-size:20px ; "> Best Wishes, </p>
       <p  style="font-size:20px ; ">Admin, </p>
       <p  style="font-size:20px ; "> Auto-Medics Ltd.</p>
      </p>
    </body>
  </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const sendMailToAdmins = async ({
  service,
  customer,
  specialist,
  admins,
  time,
  date,
}: mailInputProps) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_AUTH,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
  const toEmails = admins?.map(admin => admin?.email)?.join(', ');
  const mailOptions = {
    from: 'auto-medics@gmail.com',
    to: ` ${toEmails}`,
    subject: `${service?.name} is booked on Auto-Medics`,
    html: `
    <html>
    <body>
      <h1   style="font-size:30px ; padding: 0 3px; font-weight:700; text-align:center; 
            color: #2387fa;">New Booking on Auto-Medics</h1>
      <p  style="font-size:20px ; padding: 0 3px;">Hello Admin,</p>
      <p   style="font-size:20px ; padding: 0 3px;"> <span style="color:#2387fa;">${service?.name}</span> is booked by <span style="color:#2387fa;"> ${customer?.name} </span>  on <span style="color:#2387fa;"> ${date} and ${time} </span> which service is provided by ${specialist?.name}.</p>
       <p   style="font-size:20px ; padding: 0 3px;"> Please check everything is doing properly.</p>
      
    </body>
  </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
