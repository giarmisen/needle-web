import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const UNSUBSCRIBE_BASE = 'https://script.google.com/macros/s/AKfycbw0HGM6DlkPXIerAP0okTqWPo71GY2EkzvcUMCtzlGyGQZS5yXE_JnDtNzmRvenRA-1/exec';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    console.log('AUDIENCE_ID:', AUDIENCE_ID);
    console.log('API KEY exists:', !!process.env.RESEND_API_KEY);
    
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    const unsubscribeUrl = `${UNSUBSCRIBE_BASE}?action=unsubscribe&email=${encodeURIComponent(email)}`;

    await resend.emails.send({
      from: 'The Needle Weekly <onboarding@resend.dev>',
      to: email,
      subject: "You're subscribed to The Needle Weekly",
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;padding:40px 0;">
          <h1 style="font-family:Arial,sans-serif;font-size:24px;font-weight:900;letter-spacing:-0.5px;margin:0 0 20px;">The Needle Weekly</h1>
          <p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">You're in. Every Sunday you'll receive the week's most interesting album releases, filtered by critical consensus across 30+ sources.</p>
          <p style="font-size:12px;color:#888;margin:32px 0 0;font-family:Arial,sans-serif;">If you want to stop receiving these emails, <a href="${unsubscribeUrl}" style="color:#888;">unsubscribe here</a>.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}