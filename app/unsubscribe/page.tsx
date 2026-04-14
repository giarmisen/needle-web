export default function UnsubscribePage({
    searchParams,
  }: {
    searchParams: { status?: string };
  }) {
    const status = searchParams.status;
  
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', fontFamily: 'Georgia, serif', padding: '0 24px' }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>
          The Needle Weekly
        </h1>
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
    );
  }