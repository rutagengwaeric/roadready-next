export default function PublicLoading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>

      {/* Left brand panel skeleton */}
      <div style={{ width: "46%", flexShrink: 0, background: "linear-gradient(145deg, #4f46e5 0%, #3730a3 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: 40 }} className="hidden md:flex">
        <Bone width={130} height={40} radius={8} dark />
        <div style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Bone width={220} height={220} radius="50%" dark />
          <Bone width="70%" height={32} radius={8} dark />
          <Bone width="55%" height={32} radius={8} dark />
          <Bone width="80%" height={18} radius={6} dark style={{ marginTop: 8 }} />
          <Bone width="65%" height={18} radius={6} dark />
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Bone width={50} height={26} radius={6} dark />
              <Bone width={60} height={14} radius={4} dark />
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel skeleton */}
      <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <Bone width={200} height={34} radius={8} style={{ marginBottom: 10 }} />
              <Bone width={260} height={18} radius={6} />
            </div>
            {[1, 2].map(i => (
              <div key={i}>
                <Bone width={120} height={16} radius={4} style={{ marginBottom: 8 }} />
                <Bone width="100%" height={50} radius={10} />
              </div>
            ))}
            <Bone width="100%" height={52} radius={10} />
            <Bone width={180} height={16} radius={4} style={{ margin: "0 auto" }} />
          </div>
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "center" }}>
          <Bone width={240} height={14} radius={4} />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .bone { background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%); background-size: 600px 100%; animation: shimmer 1.4s infinite linear; }
        .bone-dark { background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%); background-size: 600px 100%; animation: shimmer 1.4s infinite linear; }
      `}</style>
    </div>
  );
}

function Bone({ width, height, radius = 6, dark = false, style }: {
  width: number | string;
  height: number | string;
  radius?: number | string;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={dark ? "bone-dark" : "bone"}
      style={{ width, height, borderRadius: radius, flexShrink: 0, ...style }}
    />
  );
}
