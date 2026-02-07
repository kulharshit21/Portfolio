import nodemailer from 'nodemailer';

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'All fields are required' }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send notification email to yourself
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT,
      replyTo: email,
      subject: `[Portfolio] ${subject} (from ${name})`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    // Send auto-reply to the sender
    await transporter.sendMail({
      from: `Harshit Kulkarni <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for reaching out - Message Received`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">Message Received</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for taking the time to reach out through my portfolio website. I have successfully received your message and truly appreciate your interest.</p>
          
          <div style="background-color: #F3F4F6; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your Message Details:</strong></p>
            <p style="margin: 10px 0 0 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <p>I make it a priority to respond to all inquiries promptly and will get back to you as soon as possible, typically within 24-48 hours.</p>
          
          <p>In the meantime, feel free to explore my work and projects on my website or connect with me on:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 8px 0;">🔗 <a href="https://www.linkedin.com/in/harshit-kulkarni-4a6554276" style="color: #3B82F6; text-decoration: none;">LinkedIn</a></li>
            <li style="margin: 8px 0;">💻 <a href="https://github.com/kulharshit21" style="color: #3B82F6; text-decoration: none;">GitHub</a></li>
          </ul>
          
          <p>Thank you once again for your message. I look forward to connecting with you soon.</p>
          
          <p style="margin-top: 30px;">Best regards,<br/>
          <strong>Harshit Kulkarni</strong><br/>
          <span style="color: #6B7280; font-size: 14px;">ML Researcher | Full-Stack Developer | IEEE Published Author</span></p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
            This is an automated response. Please do not reply directly to this email.<br/>
            For urgent matters, you can reach me at kulharshit21@gmail.com
          </p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error('Contact function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: 'Failed to send email. Please try again later.' }),
    };
  }
}
