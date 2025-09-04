/**
 * API route for handling join requests.
 *
 * This route accepts a JSON payload containing details submitted via the
 * registration form.  It uses Nodemailer to forward the payload to the
 * configured workspace alias (WORKSPACE_ALIAS) so the concierge team can
 * review it.  SMTP credentials must be supplied via environment variables in
 * your Vercel project; see the README for details.
 */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const payload = body.payload || {};

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    const to = process.env.WORKSPACE_ALIAS;
    const from = process.env.SMTP_FROM || process.env.WORKSPACE_ALIAS;
    const subject = 'The PDR — New Join Request';
    const text = `New join request:\n\n${JSON.stringify(payload, null, 2)}`;

    await transporter.sendMail({ from, to, subject, text });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Join API error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}