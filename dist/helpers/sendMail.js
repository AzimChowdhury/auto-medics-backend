"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailToAdmins = exports.sendMailToSpecialist = exports.sendMailToCustomer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMailToCustomer = ({ service, customer, time, date, }) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_AUTH,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });
    const mailOptions = {
        from: 'auto-medics@gmail.com',
        to: ` ${customer === null || customer === void 0 ? void 0 : customer.email}`,
        subject: `${service === null || service === void 0 ? void 0 : service.name} is booked on Auto-Medics`,
        html: `
    <html>
    <body>
      <h1   style="font-size:30px ; padding: 0 3px; font-weight:700; text-align:center; 
            color: #2387fa;">Welcome to Auto-Medics</h1>
      <p  style="font-size:20px ; padding: 0 3px;">Hello <span style="color:#2387fa;">${customer === null || customer === void 0 ? void 0 : customer.name}</span>,</p>
      <p   style="font-size:20px ; padding: 0 3px;"> <span style="color:#2387fa;">${service === null || service === void 0 ? void 0 : service.name}</span> is booked for you on <span style="color:#2387fa;"> ${date} and ${time} </span> within the cost of <span style="color:#2387fa;"> $${service === null || service === void 0 ? void 0 : service.price} </span></p>
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
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
});
exports.sendMailToCustomer = sendMailToCustomer;
const sendMailToSpecialist = ({ service, customer, specialist, time, date, }) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_AUTH,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });
    const mailOptions = {
        from: 'auto-medics@gmail.com',
        to: ` ${specialist === null || specialist === void 0 ? void 0 : specialist.email}`,
        subject: `${service === null || service === void 0 ? void 0 : service.name} is booked on Auto-Medics`,
        html: `
    <html>
    <body>
      <h1   style="font-size:30px ; padding: 0 3px; font-weight:700; text-align:center; 
            color: #2387fa;">New work for you</h1>
      <p  style="font-size:20px ; padding: 0 3px;">Hello <span style="color:#2387fa;">${specialist === null || specialist === void 0 ? void 0 : specialist.name}</span>,</p>
      <p   style="font-size:20px ; padding: 0 3px;"> <span style="color:#2387fa;">${service === null || service === void 0 ? void 0 : service.name}</span> is booked by <span style="color:#2387fa;"> ${customer === null || customer === void 0 ? void 0 : customer.name} </span>  on <span style="color:#2387fa;"> ${date} and ${time} </span> which service is provided by you.</p>
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
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
});
exports.sendMailToSpecialist = sendMailToSpecialist;
const sendMailToAdmins = ({ service, customer, specialist, admins, time, date, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_AUTH,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });
    const toEmails = (_a = admins === null || admins === void 0 ? void 0 : admins.map(admin => admin === null || admin === void 0 ? void 0 : admin.email)) === null || _a === void 0 ? void 0 : _a.join(', ');
    const mailOptions = {
        from: 'auto-medics@gmail.com',
        to: ` ${toEmails}`,
        subject: `${service === null || service === void 0 ? void 0 : service.name} is booked on Auto-Medics`,
        html: `
    <html>
    <body>
      <h1   style="font-size:30px ; padding: 0 3px; font-weight:700; text-align:center; 
            color: #2387fa;">New Booking on Auto-Medics</h1>
      <p  style="font-size:20px ; padding: 0 3px;">Hello Admin,</p>
      <p   style="font-size:20px ; padding: 0 3px;"> <span style="color:#2387fa;">${service === null || service === void 0 ? void 0 : service.name}</span> is booked by <span style="color:#2387fa;"> ${customer === null || customer === void 0 ? void 0 : customer.name} </span>  on <span style="color:#2387fa;"> ${date} and ${time} </span> which service is provided by ${specialist === null || specialist === void 0 ? void 0 : specialist.name}.</p>
       <p   style="font-size:20px ; padding: 0 3px;"> Please check everything is doing properly.</p>
      
    </body>
  </html>
    `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
});
exports.sendMailToAdmins = sendMailToAdmins;
