import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const allowedOrigins = [
  "https://nandnretail.com",
  "https://nlk.thesocialants.com",
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin || "";

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"N&N Retails Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}
      `,
    });

    // Forward to Google Sheets
    await fetch("https://script.google.com/macros/s/AKfycbytrrc6JL9MJmcDEg6URS6_xiHiDMY4OsorgQfR9-k9uCBevUp6DS7Ylwmc7kx9J9BP7A/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, subject, message }),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email or log to sheet." });
  }
}
