'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const purchaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  githubUser: z
    .string()
    .min(1, 'GitHub username is required')
    .regex(/^[a-zA-Z0-9-]+$/, 'GitHub username can only contain letters, numbers and -'),
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  family: 4,
} as SMTPTransport.Options);

export async function submitPurchase(prevState: any, formData: FormData) {
  const validated = purchaseSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    githubUser: formData.get('githubUser'),
  });

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: 'Please fill in all fields correctly.',
    };
  }

  const { name, email, githubUser } = validated.data;

  if (!process.env.GMAIL_ADDRESS || !process.env.GMAIL_APP_PASSWORD || !process.env.PURCHASE_RECEIVER) {
    console.error('Missing GMAIL/PURCHASE env vars.');
    return {
      success: false,
      message: 'Purchase registration is not fully configured yet. Please try again later.',
    };
  }

  try {
    await transporter.sendMail({
      from: `"NextCove Store" <${process.env.GMAIL_ADDRESS}>`,
      to: process.env.PURCHASE_RECEIVER,
      replyTo: email,
      subject: `NextCove purchase — GitHub invite for ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nGitHub username: ${githubUser}\n\nInvite this GitHub user to the private client-sites repository.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">NextCove purchase</h2>
          <p>A customer has paid and wants access to the source code.</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>GitHub username:</strong> <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">${githubUser}</code></p>
          <hr style="border:0;border-top:1px solid #eee;margin:20px 0;" />
          <p>Invite <strong>${githubUser}</strong> to the private <code>client-sites</code> repository with read access.</p>
        </div>
      `,
    });

    return { success: true, message: 'Thank you! Your access request has been received.' };
  } catch (error) {
    console.error('Purchase email error:', error);
    return {
      success: false,
      message: 'Could not send the request right now. Please try again or use the contact form.',
    };
  }
}
