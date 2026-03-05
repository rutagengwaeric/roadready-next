/* Root loading — shown only for the homepage (app/page.tsx).
   All other route groups define their own loading.tsx */
export default function RootLoading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f5ff" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", border: "4px solid #e0e7ff", borderTopColor: "#4f46e5", animation: "spin 0.7s linear infinite" }} />
        <p style={{ fontSize: "1.4rem", color: "#94a3b8", fontWeight: 500 }}>Gutegereza…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
