const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Create Nodemailer transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'officialmindmatters@gmail.com',
    pass: process.env.EMAIL_PASS // This should be an app password from Gmail
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, newsletter } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'officialmindmatters@gmail.com',
      to: 'officialmindmatters@gmail.com',
      subject: `Contact Form: ${subject} - Project Mind Matters`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p><strong>Newsletter Subscription:</strong> ${newsletter ? 'Yes' : 'No'}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Project Mind Matters contact form.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please try again.' 
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide an email address' 
      });
    }

    // Email content for newsletter subscription
    const mailOptions = {
      from: process.env.EMAIL_USER || 'officialmindmatters@gmail.com',
      to: 'officialmindmatters@gmail.com',
      subject: 'New Newsletter Subscription - Project Mind Matters',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">New Newsletter Subscription</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            This subscription was made from the Project Mind Matters website.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    });

  } catch (error) {
    console.error('Error sending newsletter subscription email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, there was an error processing your subscription.' 
    });
  }
});

// Serve the main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'about.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'blog.html'));
});

app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'team.html'));
});

app.get('/testimonials', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'testimonials.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Contact form endpoint: POST /api/contact');
  console.log('Newsletter endpoint: POST /api/newsletter');
}); 