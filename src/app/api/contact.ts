'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

// Definerer validering av skjemaet
const contactSchema = z.object({
    name: z.string().min(2, 'Navn må være minst 2 tegn'),
    email: z.string().email('Ugyldig e-postadresse'),
    message: z.string().min(10, 'Meldingen må være minst 10 tegn'),
    turnstileToken: z.string().min(1, 'Sikkerhetsverifisering kreves'),
});

// Oppretter en gjenbrukbar Nodemailer transportør
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    /* family: 4, */
} as SMTPTransport.Options);

export async function submitContactForm(prevState: any, formData: FormData) {
    // 1. Valider skjemadata med Zod
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        turnstileToken: formData.get('cf-turnstile-response'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Vennligst fyll ut alle feltene riktig.',
        };
    }

    const { name, email, message, turnstileToken } = validatedFields.data;

    // 2. Verifiser Turnstile-tokenet hos Cloudflare
    try {
        const verifyResponse = await fetch('https://cloudflare.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!,
                response: turnstileToken,
            }),
        });


        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            return {
                success: false,
                message: 'Sikkerhetsverifisering feilet. Prøv igjen.',
            };
        }
    } catch (error) {
        console.error("SERVER TURNSTILE ERROR:", error);
        return {
            success: false,
            message: 'Kunne ikke verifisere sikkerhetsfilteret. Prøv igjen senere.',
        };
    }

    // 3. Send e-posten med Nodemailer
    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, // Sendes fra din SMTP-bruker for å unngå spamfilter
            to: process.env.CONTACT_RECEIVER,
            replyTo: email, // Gjør at du svarer direkte til kunden når du trykker "Svar" i mailboksen din
            subject: `Ny henvendelse fra kontaktskjema: ${name}`,
            text: `Navn: ${name}\nE-post: ${email}\n\nMelding:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Ny melding fra kontaktskjema</h2>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Melding:</strong></p>
          <p style="white-space: pre-wrap; background: #f9fafb; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
        });

        return {
            success: true,
            message: 'Takk! Meldingen din har blitt sendt.',
        };
    } catch (error) {
        console.error('Nodemailer feil:', error);
        return {
            success: false,
            message: 'Kunne ikke sende e-posten akkurat nå. Prøv igjen senere.',
        };
    }
}