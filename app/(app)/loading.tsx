export default function AppLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column" }}>

      {/* Header skeleton */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Bone width={120} height={36} radius={8} />
          {/* Nav */}
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Bone width={72} height={18} radius={6} />
            <Bone width={56} height={18} radius={6} />
            <Bone width={96} height={34} radius={20} />
            <Bone width={80} height={34} radius={8} />
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, maxWidth: 1240, margin: "0 auto", width: "100%", padding: "28px 24px", display: "grid", gridTemplateColumns: "256px 1fr 256px", gap: 20 }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Greeting card */}
          <div style={card}>
            <Bone width={100} height={16} radius={6} style={{ marginBottom: 10 }} />
            <Bone width="80%" height={22} radius={6} style={{ marginBottom: 16 }} />
            <Bone width="100%" height={10} radius={4} style={{ marginBottom: 6 }} />
            <Bone width={60} height={14} radius={4} />
          </div>
          {/* WhatsApp card */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Bone width={32} height={32} radius="50%" />
              <Bone width={100} height={16} radius={6} />
            </div>
            <Bone width="100%" height={38} radius={8} />
          </div>
          {/* Score card */}
          <div style={card}>
            <Bone width={120} height={16} radius={6} style={{ marginBottom: 14 }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Bone width={40} height={32} radius={6} />
                <Bone width={70} height={12} radius={4} />
              </div>
              <Bone width={70} height={80} radius={8} />
            </div>
          </div>
        </aside>

        {/* MAIN COLUMN */}
        <main style={{ display: "flex", flexDirection: "column", gap: 20, alignSelf: "start" }}>
          {/* Progress cards */}
          {[1, 2].map(i => (
            <div key={i} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Bone width={140} height={20} radius={6} />
                  <Bone width={90} height={14} radius={4} />
                </div>
                <Bone width={70} height={26} radius={20} />
              </div>
              <Bone width="100%" height={6} radius={4} style={{ marginBottom: 10 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Bone width={80} height={14} radius={4} />
                <Bone width={80} height={30} radius={8} />
              </div>
            </div>
          ))}
          {/* Start test button */}
          <div style={card}>
            <Bone width="100%" height={52} radius={10} />
          </div>
        </main>

        {/* RIGHT COLUMN */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Subscription card */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Bone width={36} height={36} radius="50%" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Bone width={80} height={16} radius={4} />
                <Bone width={60} height={12} radius={4} />
              </div>
            </div>
            <Bone width="100%" height={6} radius={4} style={{ marginBottom: 8 }} />
            <Bone width={120} height={12} radius={4} />
          </div>
          {/* Tips card */}
          <div style={card}>
            <Bone width={100} height={16} radius={6} style={{ marginBottom: 12 }} />
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <Bone width={20} height={20} radius="50%" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                  <Bone width="100%" height={12} radius={4} />
                  <Bone width="70%" height={12} radius={4} />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .bone {
          background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite linear;
        }
      `}</style>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 20,
};

function Bone({ width, height, radius = 6, style }: {
  width: number | string;
  height: number | string;
  radius?: number | string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="bone"
      style={{ width, height, borderRadius: radius, flexShrink: 0, ...style }}
    />
  );
}
