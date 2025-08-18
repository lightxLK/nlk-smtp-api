# N&N SMTP Contact API

This is a minimal Next.js API project for handling contact form submissions via email using Gmail SMTP and Nodemailer, developed by Lokesh. 
It is designed to be deployed on Vercel /Netlify and used as a backend endpoint for static or dynamic websites.

---

## Features

- Accepts POST requests at `/api/contact`
- Sends contact form details to your Gmail inbox using Nodemailer
- CORS enabled for requests from your frontend domain

---

## Usage

### 1. **Environment Variables**

Set these in your Vercel/Netlify project settings:

- `GMAIL_USER` – Your Gmail address (e.g. `lokesh@thesocialants.com`)
- `GMAIL_PASS` – Your Gmail App Password (see [Gmail App Passwords](https://support.google.com/accounts/answer/185833))

### 2. **API Endpoint**

Send a POST request to:

```
https://<your-vercel-project>.vercel.app/api/contact
```

**Request body (JSON):**
```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "phone": "1234567890",
  "subject": "Subject",
  "message": "Your message"
}
```

### 3. **CORS**

This API allows requests from `https://nlk.thesocialants.com` by default.  
To change, edit the `Access-Control-Allow-Origin` header in `src/pages/api/contact.ts`.

---

## Local Development

1. Clone the repo
2. Install dependencies:
   ```
   npm install
   ```
3. Add a `.env.local` file:
   ```
   GMAIL_USER=your@gmail.com
   GMAIL_PASS=your-app-password
   ```
4. Run locally:
   ```
   npm run dev
   ```

---

## Security

- **Never commit your Gmail password or app password to the repo.**
- Always use environment variables for sensitive data.

---

## License

GNU Affero V3

---

**Contact:**  
For questions, reach out to [lokesh@thesocialants.com](mailto:lokesh@thesocialants.com) | [light](https://lightxlk.github.io/)
