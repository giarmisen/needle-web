import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.redirect(new URL('/?unsubscribe=error', req.url));
  }

  try {
    const contacts = await resend.contacts.list({ audienceId: AUDIENCE_ID });
    const contact = contacts.data?.data?.const contact = contacts.data?.data?.find((c: { id: string; email: string;find((c: any) => c.email === email);

    if (!contact) {
      return NextResponse.redirect(new URL('/unsubscribe?status=notfound', req.url));
    }

    await resend.contacts.update({
      id: contact.id,
      audienceId: AUDIENCE_ID,
      unsubscribed: true,
    });

    return NextResponse.redirect(new URL('/unsubscribe?status=success', req.url));
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url));
  }
}