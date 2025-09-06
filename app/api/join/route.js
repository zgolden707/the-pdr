export const runtime = 'nodejs';

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
    const subject = 'The PDR \u2014 New Join Request';
    const text = `New join request:\n\n${JSON.stringify(payload, null, 2)}`;

    await transporter.sendMail({ from, to, subject, text });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Join API error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
