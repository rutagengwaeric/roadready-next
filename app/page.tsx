import Link from "next/link";
import Image from "next/image";

const features = [
  { icon: "/assets/images/icons/Document.svg",     text: "Ibizami 20 Bikubiyemo Imyitozo Irenga 450+" },
  { icon: "/assets/images/icons/Image.svg",         text: "Usubiza Ikibazo mugihe cyingana n'umunota umwe gusa" },
  { icon: "/assets/images/icons/Notification.svg",  text: "Ibyapa 125 n'amafoto bigufasha gusobanukirwa Byimbitse" },
  { icon: "/assets/images/icons/Work-1.svg",        text: "Aho ugeze haribika, iyo ugarutse bitagusaba Gutangira." },
  { icon: "/assets/images/icons/Close Square.svg",  text: "Mugihe uhisemo wakora ibizami byakugoye gusa." },
  { icon: "/assets/images/icons/Paper Upload.svg",  text: "Igihe amategeko ahindutse roadready ihindukana nayo." },
  { icon: "/assets/images/icons/Call Silent.svg",   text: "Ushobora kuyikoresha nta internet." },
];

const plans = [
  { name: "Bronze",  price: "900",  period: "Umunsi",    img: "/assets/images/bronze 1.png",          features: ["Imara amasaha 24 gusa", "Ni nziza kw'igerageza", "Ntikoreshwa nta murandasi"] },
  { name: "Silver",  price: "2000", period: "Icyumweru",  img: "/assets/images/icons/silver 1.png",    features: ["Imara icyumweru cyose",  "Wakwigiramo byinshi",    "Uhahwe igabanyirizwa"] },
  { name: "Gold",    price: "3000", period: "Ibyumweru 2",img: "/assets/images/gold 1.png",            features: ["Imara ibyumweru 2",      "Niyo twaguhitiramo",     "Igabanyirizwa ryisumbuye"] },
  { name: "Diamond", price: "5000", period: "Ukwezi",     img: "/assets/images/icons/diamond.png",     features: ["Imara ukwezi kwose",     "Ni nziza k'umutangizi",  "Igabanyirizwa rikuru"] },
];

export default function LandingPage() {
  return (
    <div className="bg-[#f9f5ff] text-[#202842]">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto px-4 h-[60px] md:h-[70px] flex items-center justify-between gap-4">

          <Link href="/" className="shrink-0">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={120} height={42} className="object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 ml-6 mr-auto">
            {[["#about","Ibisobanuro"],["#price","Ibiciro"],["#contact","Twandikire"]].map(([href,label]) => (
              <a key={href} href={href} className="nav-link text-[#202842] font-medium">{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login"    className="btn btn-outline hidden sm:inline-flex" style={{ height: 38, fontSize: "1.3rem", paddingInline: 18 }}>Injira</Link>
            <Link href="/register" className="btn btn-primary"                       style={{ height: 38, fontSize: "1.3rem", paddingInline: 18 }}>Iyandikishe</Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="w-full"
        style={{
          backgroundImage: "url('/assets/images/icons/hero bg phone 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10 md:py-16 flex flex-wrap items-center gap-6">

          {/* Text — order 1 on mobile & desktop */}
          <div className="flex-1 min-w-[280px] text-white order-1">
            <h1 className="font-black text-center md:text-left leading-[0.9] tracking-wide"
                style={{ fontSize: "clamp(3.6rem, 6vw, 5.5rem)" }}>
              Tsindira Provisoire
            </h1>
            <p className="font-black text-center md:text-left leading-[0.95] mt-3 mb-4"
               style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}>
              Ukoze{" "}
              <span className="relative inline-block">
                Rimwe Gusa
                <span className="absolute bottom-[6px] left-0 w-full h-[7px] bg-[#0ad4c8] -z-[1] rounded-sm" />
              </span>
            </p>
            <p className="text-white/70 text-center md:text-left text-[1.5rem] leading-[1.5] mb-7 max-w-[46ch]">
              Minuza amategeko y&apos;umuhanda ukoresheje telefoni yawe igendanwa — unimenyereze ibizami byose usanga muri app ya Roadready.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-secondary" style={{ height: 44, fontSize: "1.4rem", paddingInline: 24 }}>
                Tangira
                <svg width="12" height="12" viewBox="0 0 23 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M14.8 1.1L22.6 8.9c.5.5.5 1.3 0 1.7L14.8 18.3a1.8 1.8 0 01-1.8-1.7l5.7-5.7H.2V8.5H18.7L13 2.8A1.8 1.8 0 0114.8 1z" fill="white"/></svg>
              </Link>
              <a href="#contact" className="btn" style={{ height: 44, paddingInline: 22, border: "2px solid #0ad4c8", color: "#fff", fontSize: "1.4rem" }}>
                Aho wadusanga
                <svg width="12" height="12" viewBox="0 0 18 19" fill="none"><path d="M17.8 2.2a1.25 1.25 0 00-1.25-1.25H5.3a1.25 1.25 0 000 2.5h9v9a1.25 1.25 0 002.5 0L17.8 2.2zM1.88 18.66l15.56-15.56-1.77-1.77L.11 16.88l1.77 1.77z" fill="white"/></svg>
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-8 flex-wrap">
              <div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="18" height="17" viewBox="0 0 28 26" fill="none">
                      <path d="M13.05 1.43C13.35.51 14.65.51 14.95 1.43l2.42 7.44a1.25 1.25 0 001.19.87h7.82c.97 0 1.37 1.24.59 1.81l-6.33 4.6a1.25 1.25 0 00-.45 1.4l2.42 7.44c.3.92-.74 1.68-1.52 1.11l-6.33-4.6a1.25 1.25 0 00-1.47 0l-6.33 4.6c-.78.57-1.82-.19-1.52-1.11l2.42-7.44a1.25 1.25 0 00-.45-1.4L.73 11.55C-.05 10.98.35 9.74 1.32 9.74h7.82a1.25 1.25 0 001.19-.87l2.42-7.44z" fill="#FFB800"/>
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-[1.2rem] mt-1">Ubuhamya <span className="text-[#FFB800] font-semibold">49</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {["/assets/images/icons/profile1.png","/assets/images/icons/profile2.png","/assets/images/icons/profile3.png"].map((src,i) => (
                    <Image key={i} src={src} alt="" width={34} height={34}
                      className="rounded-full border-2 border-white object-cover"
                      style={{ marginLeft: i > 0 ? -10 : 0 }} />
                  ))}
                </div>
                <p className="text-white/70 text-[1.3rem]">260+ Batsinze kubera Roadready</p>
              </div>
            </div>
          </div>

          {/* Hero image — hidden on mobile */}
          <div className="hidden md:block flex-1 min-w-[300px] order-2">
            <Image src="/assets/images/hero-banner 1.png" alt="Hero" width={520} height={420}
              className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-[70px]">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-wrap items-center gap-10">

          {/* Image side — desktop only */}
          <div className="hidden md:block w-[42%] shrink-0">
            <Image src="/assets/images/about-banner 1.png" alt="About RoadReady" width={440} height={400}
              className="w-full h-auto object-cover rounded-2xl" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-[280px]">
            <h2 className="text-[2.8rem] font-bold text-center leading-tight mb-3">Uko RoadReady Ikora</h2>
            <p className="text-[#202842]/60 text-[1.4rem] text-center leading-[1.6] mb-6">
              Ni Application Ikorera Muri telefoni, mudasobwa ndetse no kuri murandasi.
              Iguha imyitozo irenga 450+ ukora, ikagukosora ndetse ikanagusobanurira.
            </p>

            {/* Mobile mockup */}
            <Image src="/assets/images/mockup.png" alt="App mockup" width={260} height={200}
              className="md:hidden block mx-auto mb-5 max-w-[260px] h-auto" />

            {/* Feature list */}
            <div className="bg-white rounded-[20px] border border-[#ece8e8] p-5 mb-6"
                 style={{ boxShadow: "0 30px 50px rgba(93,109,255,0.08)" }}>
              <ul className="grid gap-4">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#202842]/65 text-[1.4rem]">
                    <span className="w-10 h-10 shrink-0 grid place-items-center border border-[#ccc] rounded-full mt-[1px]">
                      <Image src={f.icon} alt="" width={20} height={20} />
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary" style={{ height: 46, paddingInline: 32, fontSize: "1.5rem" }}>
                Tangira
              </Link>
              <div className="flex items-center gap-2 text-[#5d6eff]">
                <span className="text-[2rem] font-bold">260+</span>
                <p className="text-[1.4rem] leading-tight">Batsinze kubera<br/>Roadready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="price" className="pt-[70px] pb-12">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="text-[2.8rem] font-bold text-center leading-tight">Hitamo Igiciro Cyikunogeye</h2>
          <p className="text-[#202842]/60 text-[1.4rem] text-center max-w-[44ch] mx-auto mt-4 mb-10 leading-[1.6]">
            Ihitiremo igiciro kikunogeye ugendeye k&apos;ubumenyi usanzwe ufite, igihe uzakorera ndetse n&apos;uburyo wigamo.
          </p>

          {/* Scrollable card row */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
               style={{ scrollSnapType: "x mandatory" }}>
            {plans.map(plan => (
              <div key={plan.name}
                   className="price-card shrink-0 w-[240px] bg-white rounded-[20px] border border-[#ece8e8] p-6 flex flex-col"
                   style={{ scrollSnapAlign: "start", height: 400 }}>
                <div className="flex items-center gap-3 mx-auto mb-2">
                  <Image src={plan.img} alt={plan.name} width={38} height={38} className="object-contain" />
                  <p className="text-[2.2rem] font-medium">{plan.name}</p>
                </div>
                <div className="flex items-baseline gap-1 mx-auto my-3">
                  <span className="text-[2.6rem] font-bold">{plan.price}</span>
                  <span className="text-[1.3rem] text-[#202842]/60">RWF / {plan.period}</span>
                </div>
                <ul className="grid gap-3 mb-auto">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[1.3rem] text-[#202842]/65">
                      <Image src="/assets/images/icons/Edit Square.svg" alt="" width={16} height={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="btn btn-primary mt-4 w-full justify-center" style={{ height: 44 }}>
                  Tangira
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact"
        className="pt-[70px] pb-16"
        style={{
          backgroundImage: "url('/assets/images/icons/contact-bg 1.png')",
          backgroundSize: "100% 50%",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: 0,
        }}>
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-[16px] border border-[#f0ecff] p-6 md:p-8 flex flex-wrap gap-8"
               style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>

            {/* Form */}
            <div className="flex-1 min-w-[260px]">
              <h3 className="text-[2.4rem] font-bold text-[#5d6eff] mb-1">Twandikire</h3>
              <p className="text-[#202842]/60 text-[1.4rem] mb-5">Turi hano Kubwawe! N&apos;iki twagufasha?</p>
              <form className="grid gap-3">
                <input type="text"  placeholder="Shyiramo amazina Yawe"    className="input-field" required />
                <input type="email" placeholder="Shyiramo Email Yawe"      className="input-field" required />
                <textarea rows={4}  placeholder="Tubwire, tuguteze yombi"  className="input-field"
                  style={{ height: "auto", paddingTop: 12, resize: "none", fontFamily: "inherit" }} />
                <button type="submit" className="btn btn-primary w-full" style={{ height: 46, fontSize: "1.5rem" }}>
                  Ohereza
                </button>
              </form>
            </div>

            {/* Address */}
            <div className="flex-1 min-w-[200px] flex flex-col">
              <Image src="/assets/images/contact illustrate.png" alt="Contact" width={260} height={160}
                className="w-full h-auto object-contain mb-4" />
              <ul className="grid gap-4 mt-2">
                {[
                  { icon: "/assets/images/icons/Location.svg", text: "KK 288 st, kicukiro - kigali" },
                  { icon: "/assets/images/icons/Call.svg",      text: "+250 785171717" },
                  { icon: "/assets/images/icons/email.svg",     text: "info@roadready.rw" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[1.4rem]">
                    <span className="w-10 h-10 shrink-0 grid place-items-center border border-[#b3c5ff] rounded-full">
                      <Image src={item.icon} alt="" width={20} height={20} />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <ul className="flex gap-3 mt-6">
                {[
                  { icon: "/assets/images/icons/facebook.svg",  href: "#" },
                  { icon: "/assets/images/icons/x.png",          href: "#" },
                  { icon: "/assets/images/icons/instagram.svg",  href: "#" },
                  { icon: "/assets/images/icons/linked.svg",     href: "#" },
                ].map((s, i) => (
                  <li key={i}>
                    <a href={s.href} className="social-icon">
                      <Image src={s.icon} alt="" width={18} height={18} className="object-contain" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady — A Binary Solutions Company. All rights reserved.</p>
        <p>Designed By ClaroCreatives</p>
      </footer>
    </div>
  );
}
