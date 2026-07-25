import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "var(--bg-primary)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-primary)",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "500px",
        width: "100%",
        textAlign: "center",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        position: "relative"
      }}>
        <h1 style={{
          fontSize: "6rem",
          fontWeight: 700,
          color: "var(--accent-primary)",
          lineHeight: 1,
          marginBottom: "10px",
          textShadow: "0 0 20px rgba(0, 212, 255, 0.3)"
        }}>404</h1>
        <h2 style={{
          fontSize: "1.8rem",
          fontWeight: 600,
          marginBottom: "20px"
        }}>Page Not Found</h2>
        <p style={{
          color: "var(--text-secondary)",
          lineHeight: "1.6",
          marginBottom: "30px",
          fontSize: "1rem"
        }}>The specified page was not found on this website. Please check the URL for mistakes and try again.</p>
        <Link href="/" className="btn-primary" style={{
          textDecoration: "none",
          display: "inline-block"
        }}>
          Return to Portfolio
        </Link>
      </div>
    </div>
  );
}
