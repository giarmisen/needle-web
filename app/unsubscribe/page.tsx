import Link from "next/link";

export default function UnsubscribePage({
    searchParams,
  }: {
    searchParams: { status?: string };
  }) {
    const status = searchParams.status;
  
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Georgia, serif', padding: '0 24px' }}>
        <div style={{ paddingBottom: '8px' }}>
          <Link
            href="/"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "11px",
              textTransform: "uppercase",
              color: "#888",
              textDecoration: "none",
            }}
          >
            THE NEEDLE WEEKLY
          </Link>
        </div>
        <div style={{ borderBottom: "2px solid #1a1a1a", padding: "24px 0" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontWeight: 900, color: "#1a1a1a", margin: 0 }}>
            Unsubscribe
          </h1>
        </div>
        <div style={{ marginTop: '24px' }}>
        {status === 'success' && (
          <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.7 }}>
            You&apos;ve been unsubscribed. You won&apos;t receive any more emails from The Needle Weekly.
          </p>
        )}
        {status === 'notfound' && (
          <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.7 }}>
            Email not found in our list.
          </p>
        )}
        {status === 'error' && (
          <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.7 }}>
            Something went wrong. Please try again.
          </p>
        )}
        <p style={{ fontSize: '12px', color: '#888', marginTop: '32px', fontFamily: 'Arial, sans-serif' }}>
          <a href="https://needle-web.vercel.app" style={{ color: '#888' }}>Back to The Needle Weekly</a>
        </p>
        </div>
      </div>
    );
  }