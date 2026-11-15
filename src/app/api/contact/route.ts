import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Simple In-Memory Rate Limiter (5 requests per IP per 1 hour window)
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (now - record.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

const ALLOWED_INQUIRY_TYPES = [
  'General Question',
  'Business Inquiry',
  'Game Development',
  'Collaboration',
  'Publishing',
  'Press & Media',
  'Bug Report',
  'Feedback',
  'Other',
];

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown Browser';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    const {
      name,
      email,
      company = '',
      subject,
      inquiryType,
      message,
      agreePrivacy,
      honeypot = '',
    } = body;

    // 1. Honeypot Anti-Spam Check
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Message received.' }, { status: 200 });
    }

    // 2. Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!subject || subject.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a subject.' }, { status: 400 });
    }

    if (!inquiryType || !ALLOWED_INQUIRY_TYPES.includes(inquiryType)) {
      return NextResponse.json({ error: 'Please select a valid inquiry type.' }, { status: 400 });
    }

    if (!message || message.trim().length < 20 || message.trim().length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 20 and 2000 characters long.' },
        { status: 400 }
      );
    }

    if (!agreePrivacy) {
      return NextResponse.json(
        { error: 'You must agree to the privacy policy to submit.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'redvegagames@gmail.com';
    const emailSubject = `[Website Contact] ${inquiryType} - ${subject}`;
    const timestamp = new Date().toISOString();

    const emailBodyText = `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Inquiry Type: ${inquiryType}
Subject: ${subject}

Message:
${message}

---------------------------------------------------
Submitted From: Redvega Games Website
Submission Time: ${timestamp}
Visitor IP: ${ip}
Browser: ${userAgent}
    `;

    const emailBodyHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #08090D; color: #F8FAFC; padding: 24px; border-radius: 12px; border: 1px solid #E63946;">
        <h2 style="color: #E63946; margin-top: 0;">Redvega Games — New Contact Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; color: #CBD5E1;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Name:</td><td>${name}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}" style="color: #00F0FF;">${email}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Company:</td><td>${company || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Inquiry Type:</td><td><span style="background: #E63946; color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${inquiryType}</span></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Subject:</td><td>${subject}</td></tr>
        </table>
        
        <h3 style="color: #F8FAFC; border-bottom: 1px solid #334155; padding-bottom: 6px;">Message Content</h3>
        <p style="background: #10131C; padding: 16px; border-radius: 8px; white-space: pre-wrap; color: #F8FAFC; border: 1px solid #1E293B;">${message}</p>
        
        <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;" />
        <p style="font-size: 11px; color: #94A3B8;">
          Submitted From: Redvega Games Website<br />
          Submission Time: ${timestamp}<br />
          Visitor IP: ${ip}<br />
          Browser: ${userAgent}
        </p>
      </div>
    `;

    const autoReplySubject = 'Thanks for contacting Redvega Games!';
    const autoReplyText = `Hi ${name},

Thank you for reaching out to Redvega Games.

We've received your message and will review it shortly. We aim to respond within 1–3 business days.

We appreciate your interest and look forward to connecting with you.

Best regards,
Redvega Games
https://redvegagames.com`;

    let emailSentSuccessfully = false;

    // Method 1: Try Resend API if RESEND_API_KEY is defined
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== '') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'Redvega Games Contact <onboarding@resend.dev>',
          to: recipientEmail,
          subject: emailSubject,
          text: emailBodyText,
          html: emailBodyHtml,
          replyTo: email,
        });

        await resend.emails.send({
          from: 'Redvega Games <onboarding@resend.dev>',
          to: email,
          subject: autoReplySubject,
          text: autoReplyText,
        });

        emailSentSuccessfully = true;
        console.log('✅ Email delivered via Resend API to:', recipientEmail);
      } catch (resendError) {
        console.error('Resend API Error:', resendError);
      }
    }

    // Method 2: Try Nodemailer SMTP if SMTP_PASS is defined
    if (!emailSentSuccessfully && process.env.SMTP_PASS && process.env.SMTP_PASS.trim() !== '') {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: process.env.SMTP_SECURE !== 'false',
          auth: {
            user: process.env.SMTP_USER || recipientEmail,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Redvega Contact Form" <${process.env.SMTP_USER || recipientEmail}>`,
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          text: emailBodyText,
          html: emailBodyHtml,
        });

        await transporter.sendMail({
          from: `"Redvega Games" <${process.env.SMTP_USER || recipientEmail}>`,
          to: email,
          subject: autoReplySubject,
          text: autoReplyText,
        });

        emailSentSuccessfully = true;
        console.log('✅ Email delivered via Nodemailer SMTP to:', recipientEmail);
      } catch (smtpError) {
        console.error('SMTP Nodemailer Error:', smtpError);
      }
    }

    // Method 3: Try Web3Forms if WEB3FORMS_ACCESS_KEY is defined
    if (!emailSentSuccessfully && process.env.WEB3FORMS_ACCESS_KEY && process.env.WEB3FORMS_ACCESS_KEY.trim() !== '') {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY.trim(),
            to_email: recipientEmail,
            from_name: name,
            email: email,
            subject: emailSubject,
            message: emailBodyText,
            company: company,
            inquiry_type: inquiryType,
          }),
        });

        const resText = await web3Res.text();
        let web3Data: Record<string, unknown> = {};
        try {
          web3Data = JSON.parse(resText);
        } catch {
          web3Data = { success: false, raw: resText };
        }

        if (web3Res.ok && web3Data.success) {
          emailSentSuccessfully = true;
          console.log('✅ Email delivered via Web3Forms API to:', recipientEmail);
        } else {
          console.warn('Web3Forms API response:', web3Data);
        }
      } catch (web3Err) {
        console.error('Web3Forms fallback error:', web3Err);
      }
    }

    // Console Log Backup
    console.log('---------------------------------------------------');
    console.log(`📩 CONTACT FORM SUBMISSION RECEIVED:`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Status Delivered: ${emailSentSuccessfully}`);
    console.log('---------------------------------------------------');

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully.',
        delivered: emailSentSuccessfully,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Internal Error:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong. Please try again in a few minutes or email us directly at redvegagames@gmail.com.',
      },
      { status: 500 }
    );
  }
}
