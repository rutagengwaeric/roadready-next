import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-[#f9f5ff] text-[#202842]">

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-[1100] border-b border-[#eee]">
        <div className="max-w-[1200px] mx-auto px-4 h-[70px] flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={130} height={45} className="object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="nav-link text-[1.3rem] text-[#202842]">Ibisobanuro</a>
            <a href="#price" className="nav-link text-[1.3rem] text-[#202842]">Ibiciro</a>
            <a href="#contact" className="nav-link text-[1.3rem] text-[#202842]">Twandikire</a>
          </nav>

          <div className="flex items-center gap-2">
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
        <div className="max-w-[1200px] mx-auto px-4 py-[30px] pb-[50px] flex flex-wrap items-center gap-8">
          {/* Hero image */}
          <div className="hidden md:block flex-1 basis-[320px] order-2">
            <Image src="/assets/images/hero-banner 1.png" alt="Hero" width={550} height={450} className="w-full h-auto object-contain" />
          </div>

          {/* Hero content */}
          <div className="flex-1 basis-[300px] text-white order-1">
            <h1 style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: 1, textAlign: "center" }}>
              Tsindira Provisoire
            </h1>
            <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBlock: "12px 18px", textAlign: "center" }}>
              Ukoze{" "}
              <span className="relative z-[1] inline-block">
                Rimwe Gusa
                <span className="absolute w-full h-[7px] bg-[#0ad4c8] bottom-[6px] left-0 -z-[1] rounded-[2px]" />
              </span>
            </p>
            <p className="text-white/65 text-center text-[1.5rem] leading-[1.5] mb-6">
              Minuza amategeko y&apos;umuhanda ukoresheje telefoni yawe igendanwa unimenyereze ibizami byose usanga muri app ya Roadready.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
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
            <div className="mt-8 flex items-center gap-5 flex-wrap">
              <div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="18" height="17" viewBox="0 0 28 26" fill="none"><path d="M13.05 1.43C13.35.51 14.65.51 14.95 1.43l2.42 7.44a1.25 1.25 0 001.19.87h7.82c.97 0 1.37 1.24.59 1.81l-6.33 4.6a1.25 1.25 0 00-.45 1.4l2.42 7.44c.3.92-.74 1.68-1.52 1.11l-6.33-4.6a1.25 1.25 0 00-1.47 0l-6.33 4.6c-.78.57-1.82-.19-1.52-1.11l2.42-7.44a1.25 1.25 0 00-.45-1.4L.73 11.55C-.05 10.98.35 9.74 1.32 9.74h7.82a1.25 1.25 0 001.19-.87l2.42-7.44z" fill="#FFB800"/></svg>
                  ))}
                </div>
                <p className="text-white/60 text-[1.2rem] mt-1">Ubuhamya <span className="text-[#FFB800]">49</span></p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative" style={{ width: 72, height: 32 }}>
                  {["/assets/images/icons/profile1.png", "/assets/images/icons/profile2.png", "/assets/images/icons/profile3.png"].map((src, i) => (
                    <Image key={i} src={src} alt="" width={32} height={32} style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #fff", position: "absolute", left: i * 18, objectFit: "cover" }} />
                  ))}
                </div>
                <p className="text-white/70 text-[1.3rem] ml-3">260+ Batsinze kubera Roadready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pt-[70px] pb-5">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-wrap items-center gap-10">
          <div className="hidden md:block flex-[0_1_40%]">
            <Image src="/assets/images/about-banner 1.png" alt="About" width={420} height={380} className="w-full h-auto object-cover" />
          </div>

          <div className="flex-1 basis-[280px]">
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 2.8rem)" }} className="font-bold text-center leading-tight">Uko RoadReady Ikora</h2>
            <p className="text-[#202842]/65 text-[1.4rem] my-[14px] text-center leading-[1.5]">
              Ni Application Ikorera Muri telefoni, mudasobwa ndetse no kuri murandasi. Iguha imyitozo irenga 450+ ukora, ikagukosora ndetse ikanagusobanurira.
            </p>

            <Image src="/assets/images/mockup.png" alt="Mockup" width={280} height={220} className="block md:hidden mx-auto mb-5 max-w-[280px] h-auto" />

            <div className="bg-white rounded-[20px] border border-[#ece8e8] mb-6 p-5" style={{ boxShadow: "0 53px 50px #5d6dff18" }}>
              <ul className="grid gap-[14px]">
                {[
                  { icon: "/assets/images/icons/Document.svg", text: "Ibizami 20 Bikubiyemo Imyitozo Irenga 450+" },
                  { icon: "/assets/images/icons/Image.svg", text: "Usubiza Ikibazo mugihe cyingana n'umunota umwe gusa" },
                  { icon: "/assets/images/icons/Notification.svg", text: "Ibyapa 125 n'amafoto bigufasha gusobanukirwa Byimbitse" },
                  { icon: "/assets/images/icons/Work-1.svg", text: "Aho ugeze haribika kuburyo iyo ugarutse bitagusaba Gutangira." },
                  { icon: "/assets/images/icons/Close Square.svg", text: "Mugihe uhisemo wakora ibizami byakugoye gusa." },
                  { icon: "/assets/images/icons/Paper Upload.svg", text: "Igihe amategeko ahindutse roadready ihindukana nayo." },
                  { icon: "/assets/images/icons/Call Silent.svg", text: "Ushobora kuyikoresha nta internet." },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-[14px] text-[#202842]/65 text-[1.4rem]">
                    <span className="min-w-[40px] h-[40px] grid place-items-center border border-[#b8b8b8] rounded-full shrink-0">
                      <Image src={item.icon} alt="" width={20} height={20} />
                    </span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary" style={{ height: 48, paddingInline: 30, fontSize: "1.4rem" }}>
                Tangira
              </Link>
              <div className="flex items-center gap-1.5 text-[#5d6eff] text-[1.4rem]">
                <span className="text-[1.9rem] font-bold">260+</span>
                <p>Batsinze kubera<br />Roadready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="pt-[70px] pb-10 max-w-[1200px] mx-auto relative">
        <div className="px-4">
          <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }} className="font-bold text-center leading-tight">Hitamo Igiciro Cyikunogeye</h2>
          <p className="text-[#202842]/65 text-center max-w-[400px] mx-auto mt-[14px] mb-9 text-[1.4rem] leading-[1.5]">
            Ihitiremo igiciro kikunogeye ugendeye k&apos;ubumenyi usanzwe ufite, igihe uzakorera ndetse n&apos;uburyo wigamo.
          </p>

          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: "inline mandatory" }}>
            {[
              { name: "Bronze", price: "900", period: "Umunsi", img: "/assets/images/bronze 1.png", features: ["Imara amasaha 24 gusa", "Ni nziza kw'igerageza", "Ntikoreshwa nta murandasi"] },
              { name: "Silver", price: "2000", period: "Icyumweru", img: "/assets/images/icons/silver 1.png", features: ["Imara icyumweru cyose", "Wakwigiramo byinshi", "Uhahwe igabanyirizwa"] },
              { name: "Gold", price: "3000", period: "Ibyumweru 2", img: "/assets/images/gold 1.png", features: ["Imara ibyumweru 2", "Niyo twaguhitiramo", "Igabanyirizwa ryisumbuye"] },
              { name: "Diamond", price: "5000", period: "Ukwezi", img: "/assets/images/icons/diamond.png", features: ["Imara ukwezi kwose", "Ni nziza k'umutangizi", "Igabanyirizwa rikuru"] },
            ].map(plan => (
              <div
                key={plan.name}
                className="price-card bg-white border border-[#ece8e8] rounded-[20px] p-[25px_20px] flex flex-col h-[400px]"
                style={{ flex: "0 0 240px", scrollSnapAlign: "start" }}
              >
                <div className="flex items-center gap-3 mx-auto mb-2">
                  <Image src={plan.img} alt={plan.name} width={40} height={40} className="w-10 h-10 object-contain" />
                  <p className="text-[2.2rem] font-medium text-[#202842]">{plan.name}</p>
                </div>
                <div className="flex items-baseline gap-1 mx-auto my-[10px]">
                  <p className="text-[2.4rem] font-semibold text-[#202842]">{plan.price}</p>
                  <span className="text-[1.4rem] font-semibold text-[#202842]">&nbsp;/ {plan.period}</span>
                </div>
                <ul className="grid gap-[10px] mb-auto mt-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#202842]/70 text-[1.3rem]">
                      <Image src="/assets/images/icons/Edit Square.svg" alt="" width={18} height={18} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="btn btn-primary mt-2" style={{ height: 45, width: "100%", fontSize: "1.4rem" }}>
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
        }}
        className="pt-[70px] pb-[60px]"
      >
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white border border-[#f9f5ff] rounded-[15px] p-[30px_24px] flex flex-wrap gap-8" style={{ boxShadow: "0 4px 4px rgba(0,0,0,0.12)" }}>
            <div className="flex-1 basis-[280px]">
              <h3 className="text-[2.2rem] font-bold text-[#5d6eff]">Twandikire</h3>
              <p className="text-[#202842]/65 text-[1.4rem] mt-1.5 mb-4">Turi hano Kubwawe! N&apos;iki twagufasha?</p>
              <Image src="/assets/images/contact illustrate.png" alt="Contact" width={260} height={140} className="md:hidden w-full max-w-[260px] h-auto mx-auto mb-5 block" />
              <form className="grid gap-2">
                <input type="text" placeholder="Shyiramo amazina Yawe" className="input-field" required />
                <input type="email" placeholder="Shyiramo Email Yawe" className="input-field" required />
                <textarea rows={4} placeholder="Tubwire, tuguteze yombi" className="input-field" style={{ height: "unset", paddingTop: 12, resize: "none", fontFamily: "inherit" }} />
                <button type="submit" className="btn btn-primary mt-3" style={{ height: 48, fontSize: "1.5rem" }}>Ohereza</button>
              </form>
            </div>

            <div className="flex-1 basis-[200px]">
              <Image src="/assets/images/contact illustrate.png" alt="Contact" width={280} height={200} className="hidden md:block w-full h-auto object-cover mb-4" />
              <ul className="grid gap-4 mt-5">
                {[
                  { icon: "/assets/images/icons/Location.svg", text: "KK 288 st, kicukiro - kigali" },
                  { icon: "/assets/images/icons/Call.svg", text: "+250 785171717" },
                  { icon: "/assets/images/icons/email.svg", text: "info@roadready.rw" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[1.4rem]">
                    <span className="min-w-[40px] h-[40px] grid place-items-center border border-[#b3c5ff] rounded-full shrink-0">
                      <Image src={item.icon} alt="" width={20} height={20} />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <ul className="flex gap-2.5 mt-6 justify-center">
                {[
                  { icon: "/assets/images/icons/facebook.svg", href: "#" },
                  { icon: "/assets/images/icons/x.png", href: "#" },
                  { icon: "/assets/images/icons/instagram.svg", href: "https://www.instagram.com/roadready.rw/#" },
                  { icon: "/assets/images/icons/linked.svg", href: "#" },
                ].map((s, i) => (
                  <li key={i}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <Image src={s.icon} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
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
          <span>&copy; Copyright 2025 RoadReady</span> - A <span>Binary Solutions</span> Company. All rights reserved.
        </p>
        <p>Designed By <span>ClaroCreatives</span></p>
      </footer>
    </div>
  );
}
