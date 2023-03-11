import { Injectable } from '@angular/core';
import Mailgun from 'mailgun.js';
import * as FormData from 'form-data';
const API_KEY = 'c3806717169c8a038ce5cc416c992e4e-7764770b-9959ba98';
const DOMAIN = 'sandbox59d09dc923ad4635a63d75a2a4ebef44.mailgun.org';
const mailgun = new Mailgun(FormData);
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  sendCreateDetails(data: any) {
    const booking: any = data;
    const client = mailgun.client({
      username: 'api',
      key: API_KEY,
      url: 'https://api.eu.mailgun.net',
    });

    const messageData: any = {
      from: 'Hotel Notifications <h.husn99@gmail.com>',
      to: booking.email,
      subject: 'Thank you for choosing our hotel.',
      html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>Your Booking Details</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  font-size: 14px;
                  line-height: 1.5;
                }
                table {
                  border-collapse: collapse;
                  margin: 20px 0;
                  width: 100%;
                }
                th, td {
                  padding: 10px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                }
                th {
                  background-color: #f2f2f2;
                  font-weight: normal;
                }
                h2 {
                  font-size: 24px;
                  margin-bottom: 20px;
                }
              </style>
            </head>
            <body>
              <h2>Your Booking Details</h2>
              <table>
                <tr>
                  <th>First Name:</th>
                  <td>${booking.firstName}</td>
                </tr>
                <tr>
                  <th>Last Name:</th>
                  <td>${booking.lastName}</td>
                </tr>
                <tr>
                  <th>City:</th>
                  <td>${booking.city}</td>
                </tr>
                <tr>
                  <th>Country:</th>
                  <td>${booking.country}</td>
                </tr>
                <tr>
                  <th>Email address:</th>
                  <td>${booking.email}</td>
                </tr>
                <tr>
                  <th>Date of Birth:</th>
                  <td>${new Date(booking.dob)}}</td>
                </tr>
              </table>
              <p>If any of the above details are incorrect or need updating, please let us know by replying to this email or contacting our customer service team at h.husn99@gmail.com.</p>
              <p>Thank you for choosing our hotel, and we look forward to welcoming you soon.</p>
              <p>Best regards,</p>
              <p>Stars Hotel</p>
            </body>
            </html>
            
            `,
    };

    client.messages
      .create(DOMAIN, messageData)
      .then((res: any) => {
        console.log({ res, success: true });
      })
      .catch((err: any) => {
        console.error(err);
        console.log({ err, success: false });
      });
  }
  sendInvoiceEmail(data: any) {
    const booking: any = data;
    console.log(booking)
    const client = mailgun.client({
      username: 'api',
      key: API_KEY,
      // url: 'https://api.eu.mailgun.net',
    });

    const messageData: any = {
      from: 'Booking Invoice <h.husn99@gmail.com>',
      to: booking.email,
      subject:
        'Thank you for booking in our hotel, please check you invoice details here.',
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 1.5;
              color: #333;
            }
            table {
              width: 100%;
              margin-bottom: 20px;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid #ddd;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            td.price {
              text-align: right;
            }
            td.total {
              font-weight: bold;
            }
            .header {
              background-color: #eee;
              padding: 20px;
              text-align: center;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
            }
            .footer p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Invoice</h1>
          </div>
          <table>
            <tr>
              <th colspan="2">Booking Details</th>
            </tr>
            <tr>
              <td>Room Number:</td>
              <td>${booking.roomSelected}</td>
            </tr>
            <tr>
              <td>Check-In Date:</td>
              <td>${new Date(booking.createdAt)}</td>
            </tr>
          </table>
          <table>
            <tr>
              <th colspan="2">Guest Details</th>
            </tr>
            <tr>
              <td>Email:</td>
              <td>${booking.email}</td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td>${booking.firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>${booking.lastName}</td>
            </tr>numChildren
          </table>
          <table>
            <tr>
              <th colspan="2">Price Details</th>
            </tr>
            <tr>
              <td>Number of Guests:</td>
              <td>${booking.numChildren + booking.numAdults}</td>
            </tr>
            <tr>
              <td>Room Price per Day:</td>
              <td>80 USD</td>
            </tr>
            <tr>
              <td>Number of Days:</td>
              <td>${booking.numDays}</td>
            </tr>
            <tr>
              <td>Extras:</td>
              <td>${booking.extra.price}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td class="price">${80} x ${booking.numDays}</td>
            </tr>
            <tr>
              <td>Discount:</td>
              <td class="price">${booking.discount}%</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td class="price total">${booking.final}</td>
            </tr>
          </table>
          <div class="footer">
            <p>Thank you for choosing our hotel
      `,
    };

    client.messages
      .create(DOMAIN, messageData)
      .then((res: any) => {
        console.log({ res, success: true });
      })
      .catch((err: any) => {
        console.error(err);
        console.log({ err, success: false });
      });
  }
}
