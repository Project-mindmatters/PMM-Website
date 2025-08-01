# EmailJS Setup Guide for Newsletter Subscription

This guide will help you set up EmailJS to handle newsletter subscriptions for the Project Mind Matters website.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. **Go to Email Services** in your EmailJS dashboard
2. **Click "Add New Service"**
3. **Choose Gmail** (or your preferred email provider)
4. **Connect your Gmail account** (officialmindmatters@gmail.com)
5. **Note down the Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. **Go to Email Templates** in your dashboard
2. **Click "Create New Template"**
3. **Template Name**: `Newsletter Subscription`
4. **Subject**: `New Newsletter Subscription - Project Mind Matters`

### Template Content:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #2c5530;">New Newsletter Subscription</h2>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Date:</strong> {{subscription_date}}</p>
  </div>
  <p style="color: #666; font-size: 12px;">
    This subscription was made from the Project Mind Matters website.
  </p>
</div>
```

5. **Save the template** and note down the Template ID (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. **Go to Account** → **API Keys**
2. **Copy your Public Key** (e.g., `user_def456`)

## Step 5: Update the Code

Replace the placeholder values in `pages/contact.html`:

```javascript
// Initialize EmailJS
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
})();

// In the newsletter form handler:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
  // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with actual values
```

### Example with real values:
```javascript
// Initialize EmailJS
(function() {
  emailjs.init("user_def456");
})();

// In the newsletter form handler:
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Step 6: Test the Setup

1. **Start your server**: `npm run dev`
2. **Go to the contact page**
3. **Fill out the newsletter subscription form**
4. **Submit and check your email** (officialmindmatters@gmail.com)

## Troubleshooting

### Email Not Sending
- Check browser console for errors
- Verify all IDs are correct (Service ID, Template ID, Public Key)
- Ensure your Gmail account is properly connected
- Check EmailJS dashboard for any error messages

### Template Variables Not Working
- Make sure template variables match exactly: `{{from_email}}`, `{{subscription_date}}`
- Check that the variable names in JavaScript match the template

### CORS Issues
- EmailJS handles CORS automatically
- If issues persist, check your browser's network tab

## EmailJS Free Plan Limits

- **200 emails per month** (free plan)
- **2 email templates**
- **1 email service**

## Upgrade Options

If you need more emails:
- **Personal Plan**: $15/month - 1,000 emails
- **Business Plan**: $49/month - 10,000 emails
- **Enterprise Plan**: Custom pricing

## Security Notes

- **Public Key is safe** to expose in frontend code
- **Service ID and Template ID** are also safe for frontend use
- **No sensitive credentials** are exposed to users

## Alternative Setup (Contact Form)

You can also use EmailJS for the main contact form by creating another template:

1. **Create a new template** for contact form submissions
2. **Use template variables** like `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
3. **Update the contact form JavaScript** to use EmailJS instead of the Node.js backend

This would eliminate the need for the Node.js server entirely if you prefer a fully frontend solution. 