import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#f9f5ff", color: "#202842" }}>

      {/* HEADER */}
      <header style={{ backgroundColor: "#fff", position: "sticky", top: 0, zIndex: 1100, borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={130} height={45} style={{ objectFit: "contain" }} />
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 30 }} className="hidden md:flex">
            <a href="#about" className="nav-link" style={{ fontSize: "1.3rem", color: "#202842" }}>Ibisobanuro</a>
            <a href="#price" className="nav-link" style={{ fontSize: "1.3rem", color: "#202842" }}>Ibiciro</a>
            <a href="#contact" className="nav-link" style={{ fontSize: "1.3rem", color: "#202842" }}>Twandikire</a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/login" className="btn btn-outline" style={{ height: 38, fontSize: "1.3rem", padding: "0 18px" }}>
              Injira
            </Link>
            <Link href="/register" className="btn btn-primary" style={{ height: 38, fontSize: "1.3rem", padding: "0 18px" }}>
              Iyandikishe
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          backgroundImage: "url('/assets/images/icons/hero bg phone 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          minHeight: 500,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "30px 16px 50px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 30 }}>
          {/* Hero image */}
          <div style={{ flex: "1 1 320px", order: 2 }} className="hidden md:block">
            <Image src="/assets/images/hero-banner 1.png" alt="Hero" width={550} height={450} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
          </div>

          {/* Hero content */}
          <div style={{ flex: "1 1 300px", color: "#fff", order: 1 }}>
            <h1 style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: 1, textAlign: "center" }}>
              Tsindira Provisoire
            </h1>
            <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBlock: "12px 18px", textAlign: "center" }}>
              Ukoze{" "}
              <span style={{ position: "relative", zIndex: 1, display: "inline-block" }}>
                Rimwe Gusa
                <span style={{ position: "absolute", width: "100%", height: 7, backgroundColor: "#0ad4c8", bottom: 6, left: 0, zIndex: -1, borderRadius: 2 }} />
              </span>
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", textAlign: "center", fontSize: "1.5rem", lineHeight: 1.5, marginBottom: 24 }}>
              Minuza amategeko y&apos;umuhanda ukoresheje telefoni yawe igendanwa unimenyereze ibizami byose usanga muri app ya Roadready.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register" className="btn btn-secondary" style={{ height: 45, paddingInline: 24, fontSize: "1.4rem" }}>
                Tangira
                <svg width="14" height="12" viewBox="0 0 23 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M14.8 1.1L22.6 8.9c.5.5.5 1.3 0 1.7L14.8 18.3a1.8 1.8 0 01-1.8-1.7l5.7-5.7H.2V8.5H18.7L13 2.8A1.8 1.8 0 0114.8 1z" fill="white"/></svg>
              </Link>
              <a href="#contact" className="btn" style={{ height: 45, paddingInline: 20, border: "2px solid #0ad4c8", color: "#fff", fontSize: "1.4rem" }}>
                Aho wadusanga
                <svg width="14" height="14" viewBox="0 0 18 19" fill="none"><path d="M17.8 2.2a1.25 1.25 0 00-1.25-1.25H5.3a1.25 1.25 0 000 2.5h9v9a1.25 1.25 0 002.5 0L17.8 2.2zM1.88 18.66l15.56-15.56-1.77-1.77L.11 16.88l1.77 1.77z" fill="white"/></svg>
              </a>
            </div>

            {/* Reviews */}
            <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="18" height="17" viewBox="0 0 28 26" fill="none"><path d="M13.05 1.43C13.35.51 14.65.51 14.95 1.43l2.42 7.44a1.25 1.25 0 001.19.87h7.82c.97 0 1.37 1.24.59 1.81l-6.33 4.6a1.25 1.25 0 00-.45 1.4l2.42 7.44c.3.92-.74 1.68-1.52 1.11l-6.33-4.6a1.25 1.25 0 00-1.47 0l-6.33 4.6c-.78.57-1.82-.19-1.52-1.11l2.42-7.44a1.25 1.25 0 00-.45-1.4L.73 11.55C-.05 10.98.35 9.74 1.32 9.74h7.82a1.25 1.25 0 001.19-.87l2.42-7.44z" fill="#FFB800"/></svg>
                  ))}
                </div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", marginTop: 4 }}>Ubuhamya <span style={{ color: "#FFB800" }}>49</span></p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", position: "relative", width: 72, height: 32 }}>
                  {["/assets/images/icons/profile1.png", "/assets/images/icons/profile2.png", "/assets/images/icons/profile3.png"].map((src, i) => (
                    <Image key={i} src={src} alt="" width={32} height={32} style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #fff", position: "absolute", left: i * 18, objectFit: "cover" }} />
                  ))}
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.3rem", marginLeft: 12 }}>260+ Batsinze kubera Roadready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ paddingTop: 70, paddingBottom: 20 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 40 }}>
          <div className="hidden md:block" style={{ flex: "0 1 40%" }}>
            <Image src="/assets/images/about-banner 1.png" alt="About" width={420} height={380} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          </div>

          <div style={{ flex: "1 1 280px" }}>
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 2.8rem)", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>Uko RoadReady Ikora</h2>
            <p style={{ color: "rgba(32,40,66,0.65)", fontSize: "1.4rem", marginBlock: "14px 20px", textAlign: "center", lineHeight: 1.5 }}>
              Ni Application Ikorera Muri telefoni, mudasobwa ndetse no kuri murandasi. Iguha imyitozo irenga 450+ ukora, ikagukosora ndetse ikanagusobanurira.
            </p>

            <Image src="/assets/images/mockup.png" alt="Mockup" width={280} height={220} style={{ display: "block", margin: "0 auto 20px", maxWidth: 280, height: "auto" }} className="md:hidden" />

            <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #ece8e8", boxShadow: "0 53px 50px #5d6dff18", padding: 20, marginBottom: 24 }}>
              <ul style={{ display: "grid", gap: 14 }}>
                {[
                  { icon: "/assets/images/icons/Document.svg", text: "Ibizami 20 Bikubiyemo Imyitozo Irenga 450+" },
                  { icon: "/assets/images/icons/Image.svg", text: "Usubiza Ikibazo mugihe cyingana n'umunota umwe gusa" },
                  { icon: "/assets/images/icons/Notification.svg", text: "Ibyapa 125 n'amafoto bigufasha gusobanukirwa Byimbitse" },
                  { icon: "/assets/images/icons/Work-1.svg", text: "Aho ugeze haribika kuburyo iyo ugarutse bitagusaba Gutangira." },
                  { icon: "/assets/images/icons/Close Square.svg", text: "Mugihe uhisemo wakora ibizami byakugoye gusa." },
                  { icon: "/assets/images/icons/Paper Upload.svg", text: "Igihe amategeko ahindutse roadready ihindukana nayo." },
                  { icon: "/assets/images/icons/Call Silent.svg", text: "Ushobora kuyikoresha nta internet." },
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(32,40,66,0.65)", fontSize: "1.4rem" }}>
                    <span style={{ minWidth: 40, height: 40, display: "grid", placeItems: "center", border: "1px solid #b8b8b8", borderRadius: "50%", flexShrink: 0 }}>
                      <Image src={item.icon} alt="" width={20} height={20} />
                    </span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <Link href="/register" className="btn btn-primary" style={{ height: 48, paddingInline: 30, fontSize: "1.4rem" }}>
                Tangira
              </Link>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#5d6eff", fontSize: "1.4rem" }}>
                <span style={{ fontSize: "1.9rem", fontWeight: 700 }}>260+</span>
                <p>Batsinze kubera<br />Roadready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" style={{ paddingTop: 70, paddingBottom: 40, maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ padding: "0 16px" }}>
          <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>Hitamo Igiciro Cyikunogeye</h2>
          <p style={{ color: "rgba(32,40,66,0.65)", textAlign: "center", maxWidth: 400, margin: "14px auto 36px", fontSize: "1.4rem", lineHeight: 1.5 }}>
            Ihitiremo igiciro kikunogeye ugendeye k&apos;ubumenyi usanzwe ufite, igihe uzakorera ndetse n&apos;uburyo wigamo.
          </p>

          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 16, scrollSnapType: "inline mandatory" }}>
            {[
              { name: "Bronze", price: "900", period: "Umunsi", img: "/assets/images/bronze 1.png", features: ["Imara amasaha 24 gusa", "Ni nziza kw'igerageza", "Ntikoreshwa nta murandasi"] },
              { name: "Silver", price: "2000", period: "Icyumweru", img: "/assets/images/icons/silver 1.png", features: ["Imara icyumweru cyose", "Wakwigiramo byinshi", "Uhahwe igabanyirizwa"] },
              { name: "Gold", price: "3000", period: "Ibyumweru 2", img: "/assets/images/gold 1.png", features: ["Imara ibyumweru 2", "Niyo twaguhitiramo", "Igabanyirizwa ryisumbuye"] },
              { name: "Diamond", price: "5000", period: "Ukwezi", img: "/assets/images/icons/diamond.png", features: ["Imara ukwezi kwose", "Ni nziza k'umutangizi", "Igabanyirizwa rikuru"] },
            ].map(plan => (
              <div
                key={plan.name}
                className="price-card"
                style={{
                  flex: "0 0 240px",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  border: "1px solid #ece8e8",
                  borderRadius: 20,
                  padding: "25px 20px",
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 auto 8px" }}>
                  <Image src={plan.img} alt={plan.name} width={40} height={40} style={{ width: 40, height: 40, objectFit: "contain" }} />
                  <p style={{ fontSize: "2.2rem", fontWeight: 500, color: "#202842" }}>{plan.name}</p>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, margin: "10px auto" }}>
                  <p style={{ fontSize: "2.4rem", fontWeight: 600, color: "#202842" }}>{plan.price}</p>
                  <span style={{ fontSize: "1.4rem", fontWeight: 600, color: "#202842" }}>&nbsp;/ {plan.period}</span>
                </div>
                <ul style={{ display: "grid", gap: 10, marginBottom: "auto", marginTop: 12 }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(32,40,66,0.7)", fontSize: "1.3rem" }}>
                      <Image src="/assets/images/icons/Edit Square.svg" alt="" width={18} height={18} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="btn btn-primary" style={{ height: 45, width: "100%", fontSize: "1.4rem", marginTop: 8 }}>
                  Tangira
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          backgroundImage: "url('/assets/images/icons/contact-bg 1.png')",
          backgroundSize: "100% 50%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          paddingTop: 70,
          paddingBottom: 60,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ background: "#fff", border: "1px solid #f9f5ff", borderRadius: 15, padding: "30px 24px", boxShadow: "0 4px 4px rgba(0,0,0,0.12)", display: "flex", flexWrap: "wrap", gap: 30 }}>
            <div style={{ flex: "1 1 280px" }}>
              <h3 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#5d6eff" }}>Twandikire</h3>
              <p style={{ color: "rgba(32,40,66,0.65)", fontSize: "1.4rem", marginBlock: "6px 16px" }}>Turi hano Kubwawe! N&apos;iki twagufasha?</p>
              <Image src="/assets/images/contact illustrate.png" alt="Contact" width={260} height={140} style={{ width: "100%", maxWidth: 260, height: "auto", margin: "0 auto 20px", display: "block" }} className="md:hidden" />
              <form style={{ display: "grid", gap: 8 }}>
                <input type="text" placeholder="Shyiramo amazina Yawe" className="input-field" required />
                <input type="email" placeholder="Shyiramo Email Yawe" className="input-field" required />
                <textarea rows={4} placeholder="Tubwire, tuguteze yombi" className="input-field" style={{ height: "unset", paddingTop: 12, resize: "none", fontFamily: "inherit" }} />
                <button type="submit" className="btn btn-primary" style={{ height: 48, fontSize: "1.5rem", marginTop: 12 }}>Ohereza</button>
              </form>
            </div>

            <div style={{ flex: "1 1 200px" }}>
              <Image src="/assets/images/contact illustrate.png" alt="Contact" width={280} height={200} style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: 16 }} className="hidden md:block" />
              <ul style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {[
                  { icon: "/assets/images/icons/Location.svg", text: "KK 288 st, kicukiro - kigali" },
                  { icon: "/assets/images/icons/Call.svg", text: "+250 785171717" },
                  { icon: "/assets/images/icons/email.svg", text: "info@roadready.rw" },
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: "1.4rem" }}>
                    <span style={{ minWidth: 40, height: 40, display: "grid", placeItems: "center", border: "1px solid #b3c5ff", borderRadius: "50%", flexShrink: 0 }}>
                      <Image src={item.icon} alt="" width={20} height={20} />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <ul style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "center" }}>
                {[
                  { icon: "/assets/images/icons/facebook.svg", href: "#" },
                  { icon: "/assets/images/icons/x.png", href: "#" },
                  { icon: "/assets/images/icons/instagram.svg", href: "https://www.instagram.com/roadready.rw/#" },
                  { icon: "/assets/images/icons/linked.svg", href: "#" },
                ].map((s, i) => (
                  <li key={i}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <Image src={s.icon} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain" }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="app-footer">
        <p style={{ maxWidth: "42ch", textAlign: "center" }}>
          <span style={{ fontWeight: 400 }}>&copy; Copyright 2025 RoadReady</span> - A <span style={{ fontWeight: 400 }}>Binary Solutions</span> Company. All rights reserved.
        </p>
        <p>Designed By <span style={{ fontWeight: 400 }}>ClaroCreatives</span></p>
      </footer>
    </div>
  );
}
