# Project Mind Matters Website

A mental health education and support initiative website with contact form functionality using Node.js and Nodemailer.

## Features

- **Contact Form**: Direct email submission to officialmindmatters@gmail.com
- **Newsletter Subscription**: Email notifications for new subscriptions
- **Responsive Design**: Mobile-friendly layout
- **Modern UI**: Clean and professional design
- **Static File Serving**: Express server serves all HTML, CSS, and assets

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

1. **Create a `.env` file** in the root directory:
```bash
cp env.example .env
```

2. **Set up Gmail App Password**:
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Generate an App Password for "Mail"
   - Use this password in your `.env` file

3. **Update the `.env` file**:
```env
EMAIL_USER=officialmindmatters@gmail.com
EMAIL_PASS=your_16_character_app_password
PORT=3000
```

### 3. Start the Server

**Development mode** (with auto-restart):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Contact Form
- **POST** `/api/contact`
- **Body**: `{ name, email, subject, message, newsletter }`
- **Response**: `{ success: boolean, message: string }`

### Newsletter Subscription
- **POST** `/api/newsletter`
- **Body**: `{ email }`
- **Response**: `{ success: boolean, message: string }`

## File Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── env.example           # Environment template
├── index.html            # Home page
├── pages/                # Other pages
│   ├── about.html
│   ├── blog.html
│   ├── contact.html
│   ├── team.html
│   └── testimonials.html
├── css/                  # Stylesheets
├── images/               # Images and assets
└── public/               # Static files
```

## Email Configuration

The server uses Nodemailer with Gmail SMTP to send emails. Make sure to:

1. Use an **App Password** (not your regular Gmail password)
2. Enable **Less secure app access** or use **OAuth2** for production
3. Test the email functionality before deploying

## Troubleshooting

### Email Not Sending
- Check your `.env` file configuration
- Verify your Gmail App Password is correct
- Ensure 2-Factor Authentication is enabled
- Check the server console for error messages

### Port Already in Use
- Change the `PORT` in your `.env` file
- Or kill the process using the current port

### CORS Issues
- The server includes CORS middleware
- If issues persist, check browser console for errors

## Deployment

For production deployment:

1. **Environment Variables**: Set up proper environment variables on your hosting platform
2. **Process Manager**: Use PM2 or similar for process management
3. **Reverse Proxy**: Use Nginx or Apache as a reverse proxy
4. **SSL**: Enable HTTPS for security

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for sensitive data
- Consider rate limiting for form submissions
- Implement CSRF protection for production use

## Support

For issues or questions, contact: officialmindmatters@gmail.com 