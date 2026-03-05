import Link from "next/link";
import Image from "next/image";

const features = [
  { icon: "/assets/images/icons/Document.svg", text: "Ibizami 20 Bikubiyemo Imyitozo Irenga 450+" },
  { icon: "/assets/images/icons/Image.svg", text: "Usubiza Ikibazo mugihe cyingana n'umunota umwe gusa" },
  { icon: "/assets/images/icons/Notification.svg", text: "Ibyapa 125 n'amafoto bigufasha gusobanukirwa Byimbitse" },
  { icon: "/assets/images/icons/Work-1.svg", text: "Aho ugeze haribika, iyo ugarutse bitagusaba Gutangira." },
  { icon: "/assets/images/icons/Close Square.svg", text: "Mugihe uhisemo wakora ibizami byakugoye gusa." },
  { icon: "/assets/images/icons/Paper Upload.svg", text: "Igihe amategeko ahindutse roadready ihindukana nayo." },
  { icon: "/assets/images/icons/Call Silent.svg", text: "Ushobora kuyikoresha nta internet." },
];

const plans = [
  { name: "Bronze", price: "900", period: "Umunsi", img: "/assets/images/bronze 1.png", bg: "#fdf3e7", color: "#cd7f32", recommended: false, features: ["Imara amasaha 24 gusa", "Ni nziza kw'igerageza", "Ntikoreshwa nta murandasi"] },
  { name: "Silver", price: "2,000", period: "Icyumweru", img: "/assets/images/icons/silver 1.png", bg: "#f5f5f5", color: "#888", recommended: false, features: ["Imara icyumweru cyose", "Wakwigiramo byinshi", "Uhahwe igabanyirizwa"] },
  { name: "Gold", price: "3,000", period: "Ibyumweru 2", img: "/assets/images/gold 1.png", bg: "#fffbf0", color: "#f5a623", recommended: true, features: ["Imara ibyumweru 2", "Niyo twaguhitiramo", "Igabanyirizwa ryisumbuye"] },
  { name: "Diamond", price: "5,000", period: "Ukwezi", img: "/assets/images/icons/diamond.png", bg: "#f0f2ff", color: "#5d6eff", recommended: false, features: ["Imara ukwezi kwose", "Ni nziza k'umutangizi", "Igabanyirizwa rikuru"] },
];

const stats = [
  { value: "260+", label: "Batsinze Provisoire" },
  { value: "450+", label: "Imyitozo Iboneka" },
  { value: "20", label: "Ibizami Byuzuye" },
  { value: "4.9★", label: "Rating y'Abakoresha" },
];

export default function LandingPage() {
  return (
    <div className="bg-[#f9f5ff] text-[#202842]">

      {/* ══ HEADER ══ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100"
        style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="shrink-0">
              <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={120} height={42} className="object-contain" />
            </Link>
            <nav className="hidden md:flex items-center gap-8 mr-auto">
              {(["#about", "#price", "#contact"] as const).map((href, i) => (
                <a key={href} href={href} className="nav-link text-[1.4rem] font-medium text-[#202842]/75">
                  {["Ibisobanuro", "Ibiciro", "Twandikire"][i]}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/login" className="btn btn-outline hidden sm:inline-flex" style={{ height: 38, fontSize: "1.3rem", paddingInline: 20 }}>Injira</Link>
            <Link href="/register" className="btn btn-primary" style={{ height: 38, fontSize: "1.3rem", paddingInline: 20 }}>Iyandikishe</Link>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{ backgroundImage: "url('/assets/images/icons/hero bg phone 1.png')", backgroundSize: "cover", backgroundPosition: "right center", backgroundRepeat: "no-repeat" }}>
        <div className="max-w-[1160px] mx-auto px-6 py-14 md:py-20 flex flex-wrap-reverse md:flex-nowrap items-center gap-10">

          <div className="text-center md:text-left w-full md:w-1/2 text-white">
            <span className="text-center md:text-left inline-block bg-white/15 text-white text-[1.2rem] font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20">
              App ya Amategeko y&apos;Umuhanda
            </span>
            <h1 className="text-center md:text-left font-black leading-[0.9] tracking-tight mb-4" style={{ fontSize: "clamp(4rem, 6vw, 6rem)" }}>
              Tsindira<br />Provisoire
            </h1>
            <p className="text-center md:text-left font-black leading-[0.95] mb-6" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}>
              Ukoze{" "}
              <span className=" relative inline-block">
                Rimwe Gusa
                <span className="absolute bottom-[5px] left-0 w-full h-[7px] bg-[#0ad4c8] -z-[1] rounded-sm" />
              </span>
            </p>
            <p className="text-white/70 text-[1.5rem] leading-[1.6] mb-8 max-w-[44ch]">
              Minuza amategeko y&apos;umuhanda ukoresheje telefoni yawe igendanwa — unimenyereze ibizami byose usanga muri app ya Roadready.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/register" className="btn btn-secondary" style={{ height: 48, fontSize: "1.5rem", paddingInline: 28 }}>
                Tangira Ubu
                <svg width="12" height="12" viewBox="0 0 23 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M14.8 1.1L22.6 8.9c.5.5.5 1.3 0 1.7L14.8 18.3a1.8 1.8 0 01-1.8-1.7l5.7-5.7H.2V8.5H18.7L13 2.8A1.8 1.8 0 0114.8 1z" fill="white" /></svg>
              </Link>
              <a href="#about" className="btn" style={{ height: 48, paddingInline: 24, border: "2px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: "1.5rem" }}>
                Menya Byinshi
              </a>
            </div>

            <div className="flex items-center gap-6 flex-wrap pt-6 border-t border-white/15">
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 28 26" fill="none">
                      <path d="M13.05 1.43C13.35.51 14.65.51 14.95 1.43l2.42 7.44a1.25 1.25 0 001.19.87h7.82c.97 0 1.37 1.24.59 1.81l-6.33 4.6a1.25 1.25 0 00-.45 1.4l2.42 7.44c.3.92-.74 1.68-1.52 1.11l-6.33-4.6a1.25 1.25 0 00-1.47 0l-6.33 4.6c-.78.57-1.82-.19-1.52-1.11l2.42-7.44a1.25 1.25 0 00-.45-1.4L.73 11.55C-.05 10.98.35 9.74 1.32 9.74h7.82a1.25 1.25 0 001.19-.87l2.42-7.44z" fill="#FFB800" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-[1.2rem]">Ubuhamya <span className="text-[#FFB800] font-semibold">49</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {["/assets/images/icons/profile1.png", "/assets/images/icons/profile2.png", "/assets/images/icons/profile3.png"].map((src, i) => (
                    <Image key={i} src={src} alt="" width={32} height={32}
                      className="rounded-full border-2 border-white object-cover" style={{ marginLeft: i > 0 ? -8 : 0 }} />
                  ))}
                </div>
                <p className="text-white/70 text-[1.3rem]"><span className="font-bold text-white">260+</span> Batsinze kubera Roadready</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <Image src="/assets/images/hero-banner 1.png" alt="App Preview" width={520} height={440}
              className="w-full max-w-[480px] h-auto object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-[3rem] font-black text-[#5d6eff] leading-none mb-1">{s.value}</p>
              <p className="text-[1.3rem] text-[#202842]/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#eef0ff] text-[#5d6eff] text-[1.3rem] font-semibold px-4 py-1.5 rounded-full mb-3">Ibisobanuro</span>
            <h2 className="text-[3.2rem] font-bold leading-tight">Uko RoadReady Ikora</h2>
            <p className="text-[#202842]/55 text-[1.5rem] mt-3 max-w-[50ch] mx-auto leading-[1.6]">
              Ni Application Ikorera Muri telefoni, mudasobwa ndetse no kuri murandasi. Iguha imyitozo irenga 450+ ukora, ikagukosora ndetse ikanagusobanurira.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-12">
            <div className="hidden md:block w-[44%] shrink-0">
              <Image src="/assets/images/about-banner 1.png" alt="About RoadReady" width={460} height={420}
                className="w-full h-auto rounded-2xl object-cover" style={{ boxShadow: "0 20px 60px rgba(93,110,255,0.15)" }} />
            </div>
            <div className="flex-1 min-w-[280px]">
              <Image src="/assets/images/mockup.png" alt="App mockup" width={240} height={180}
                className="md:hidden block mx-auto mb-8 max-w-[240px] h-auto" />
              <div className="bg-white rounded-2xl border border-[#ece8e8] p-6" style={{ boxShadow: "0 8px 40px rgba(93,109,255,0.07)" }}>
                <ul className="grid gap-4">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-10 h-10 shrink-0 grid place-items-center bg-[#f0f2ff] rounded-xl mt-[1px]">
                        <Image src={f.icon} alt="" width={20} height={20} />
                      </span>
                      <p className="text-[1.4rem] text-[#202842]/70 leading-[1.5] pt-1">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                <Link href="/register" className="btn btn-primary" style={{ height: 48, paddingInline: 32, fontSize: "1.5rem" }}>Tangira Ubu</Link>
                <div className="flex items-center gap-2 text-[#5d6eff]">
                  <span className="text-[2.4rem] font-black">260+</span>
                  <div className="text-[1.3rem] leading-tight text-[#202842]/60">Batsinze kubera<br />Roadready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="price" className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#eef0ff] text-[#5d6eff] text-[1.3rem] font-semibold px-4 py-1.5 rounded-full mb-3">Ibiciro</span>
            <h2 className="text-[3.2rem] font-bold leading-tight">Hitamo Igiciro Cyikunogeye</h2>
            <p className="text-[#202842]/55 text-[1.5rem] mt-3 max-w-[48ch] mx-auto leading-[1.6]">
              Ihitiremo igiciro kikunogeye ugendeye k&apos;ubumenyi usanzwe ufite, igihe uzakorera ndetse n&apos;uburyo wigamo.
            </p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible" style={{ scrollSnapType: "x mandatory" }}>
            {plans.map(plan => (
              <div key={plan.name}
                className="relative shrink-0 w-[240px] lg:w-auto rounded-2xl flex flex-col p-6 transition-all duration-300 hover:-translate-y-2"
                style={{
                  scrollSnapAlign: "start",
                  background: plan.recommended ? "#5d6eff" : "#fff",
                  border: `1px solid ${plan.recommended ? "#5d6eff" : "#ece8e8"}`,
                  boxShadow: plan.recommended ? "0 20px 50px rgba(93,110,255,0.35)" : "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                {plan.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0ad4c8] text-white text-[1.1rem] font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Twaguhitiramo
                  </span>
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl grid place-items-center" style={{ background: plan.recommended ? "rgba(255,255,255,0.2)" : plan.bg }}>
                    <Image src={plan.img} alt={plan.name} width={28} height={28} className="object-contain" />
                  </div>
                  <p className="text-[2rem] font-bold" style={{ color: plan.recommended ? "#fff" : "#202842" }}>{plan.name}</p>
                </div>
                <div className="mb-5">
                  <span className="text-[3rem] font-black" style={{ color: plan.recommended ? "#fff" : "#202842" }}>{plan.price}</span>
                  <span className="text-[1.3rem] ml-1" style={{ color: plan.recommended ? "rgba(255,255,255,0.65)" : "#202842/50" }}>RWF / {plan.period}</span>
                </div>
                <ul className="grid gap-3 mb-6 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[1.3rem]" style={{ color: plan.recommended ? "rgba(255,255,255,0.85)" : "#202842/65" }}>
                      <span className="w-5 h-5 rounded-full grid place-items-center shrink-0" style={{ background: plan.recommended ? "rgba(255,255,255,0.2)" : "#eef0ff" }}>
                        <svg width="10" height="8" viewBox="0 0 12 9" fill="none"><path d="M1 4l3.5 3.5L11 1" stroke={plan.recommended ? "#fff" : "#5d6eff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="btn w-full justify-center" style={{ height: 46, fontSize: "1.4rem", fontWeight: 700, background: plan.recommended ? "#fff" : "#5d6eff", color: plan.recommended ? "#5d6eff" : "#fff" }}>
                  Tangira
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="py-20"
        style={{ backgroundImage: "url('/assets/images/icons/contact-bg 1.png')", backgroundSize: "100% 55%", backgroundRepeat: "no-repeat", backgroundPositionY: 0 }}>
        <div className="max-w-[960px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#eef0ff] text-[#5d6eff] text-[1.3rem] font-semibold px-4 py-1.5 rounded-full mb-3">Twandikire</span>
            <h2 className="text-[3.2rem] font-bold leading-tight">Turi Hano Kubwawe</h2>
            <p className="text-[#202842]/55 text-[1.5rem] mt-2">N&apos;iki twagufasha?</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#f0ecff] overflow-hidden flex flex-wrap" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
            <div className="flex-1 min-w-[280px] p-8">
              <form className="grid gap-4">
                <div>
                  <label className="block text-[1.3rem] font-medium text-[#202842]/65 mb-1.5">Amazina Yawe</label>
                  <input type="text" placeholder="Shyiramo amazina yawe" className="input-field" required />
                </div>
                <div>
                  <label className="block text-[1.3rem] font-medium text-[#202842]/65 mb-1.5">Email Yawe</label>
                  <input type="email" placeholder="shyiramo@email.com" className="input-field" required />
                </div>
                <div>
                  <label className="block text-[1.3rem] font-medium text-[#202842]/65 mb-1.5">Ubutumwa</label>
                  <textarea rows={4} placeholder="Tubwire, tuguteze yombi..." className="input-field"
                    style={{ height: "auto", paddingTop: 12, resize: "none", fontFamily: "inherit" }} />
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ height: 48, fontSize: "1.5rem" }}>Ohereza Ubutumwa</button>
              </form>
            </div>

            <div className="w-full md:w-[320px] shrink-0 bg-[#f8f7ff] border-t md:border-t-0 md:border-l border-[#ece8e8] p-8 flex flex-col gap-6">
              <Image src="/assets/images/contact illustrate.png" alt="Contact" width={220} height={140} className="w-full max-w-[200px] mx-auto h-auto object-contain" />
              <ul className="grid gap-5">
                {[
                  { icon: "/assets/images/icons/Location.svg", label: "Aderesi", text: "KK 288 st, Kicukiro — Kigali" },
                  { icon: "/assets/images/icons/Call.svg", label: "Telefoni", text: "+250 785 171 717" },
                  { icon: "/assets/images/icons/email.svg", label: "Email", text: "info@roadready.rw" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-10 h-10 shrink-0 grid place-items-center bg-[#eef0ff] rounded-xl">
                      <Image src={item.icon} alt="" width={18} height={18} />
                    </span>
                    <div>
                      <p className="text-[1.2rem] font-semibold text-[#202842]/45 uppercase tracking-wide">{item.label}</p>
                      <p className="text-[1.4rem] text-[#202842] font-medium mt-0.5">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-[1.2rem] font-semibold text-[#202842]/45 uppercase tracking-wide mb-3">Social Media</p>
                <ul className="flex gap-3">
                  {["/assets/images/icons/facebook.svg", "/assets/images/icons/x.png", "/assets/images/icons/instagram.svg", "/assets/images/icons/linked.svg"].map((icon, i) => (
                    <li key={i}><a href="#" className="social-icon"><Image src={icon} alt="" width={18} height={18} className="object-contain" /></a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="app-footer">
        <p>&copy; Copyright {new Date().getFullYear()} RoadReady — A Binary Solutions Company. All rights reserved.</p>
        <p>Designed By Binary Solutions</p>
      </footer>
    </div>
  );
}
