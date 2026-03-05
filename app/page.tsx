import Link from "next/link";

const plans = [
  { name: "Bronze", price: 900, period: "Umunsi", color: "from-amber-700 to-amber-500", features: ["Imara amasaha 24", "Ni nziza kw'igerageza", "Ibizami byose"] },
  { name: "Silver", price: 2000, period: "Icyumweru", color: "from-gray-400 to-gray-300", features: ["Imara icyumweru cyose", "Wakwigiramo byinshi", "Igabanyirizwa"] },
  { name: "Gold", price: 3000, period: "Ibyumweru 2", color: "from-yellow-500 to-yellow-400", features: ["Imara ibyumweru 2", "Niyo twaguhitiramo", "Igabanyirizwa ryisumbuye"], popular: true },
  { name: "Diamond", price: 5000, period: "Ukwezi", color: "from-blue-400 to-cyan-400", features: ["Imara ukwezi kwose", "Ni nziza k'umutangizi", "Igabanyirizwa rikuru"] },
];

const features = [
  { icon: "📝", text: "Ibizami 20 Bikubiyemo Imyitozo Irenga 450+" },
  { icon: "🖼️", text: "Ibyapa 125 n'amafoto bigufasha gusobanukirwa" },
  { icon: "🔔", text: "Usubiza ikibazo mu gihe cy'umunota umwe" },
  { icon: "💼", text: "Aho ugeze haribika kuburyo iyo ugarutse bitagusaba gutangira" },
  { icon: "❌", text: "Ibizami byakugoye gusa wimurikirwa" },
  { icon: "📤", text: "Amategeko ahindutse roadready ihindukana nayo" },
  { icon: "📵", text: "Ushobora kuyikoresha nta internet" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#5d63ff]">Road<span className="text-gray-800">Ready</span></span>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-[#5d63ff] transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-[#5d63ff] transition-colors">Ibiciro</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-[#5d63ff] transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-[#5d63ff] hover:underline">Injira</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-5 rounded-xl">Iyandikishe</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-[#5d63ff]/10 text-[#5d63ff] text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span>260+ Batsinze kubera RoadReady</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Tsindira <span className="text-[#5d63ff]">Provisoire</span><br />Ukoze Rimwe Gusa
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Minuza amategeko y'umuhanda ukoresheje telefoni yawe igendanwa unimenyereze ibizami byose usanga muri app ya Roadready.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="btn-primary inline-flex items-center gap-2 text-base py-4 px-8">
            Tangira Ubu
            <svg width="16" height="12" viewBox="0 0 23 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M14.8 1.1L22.6 8.9a1.8 1.8 0 010 2.2L14.8 18.3a1.8 1.8 0 01-1.7-1.7l5.7-5.7H.2V8.5H18.7L13 2.8A1.8 1.8 0 0114.8 1z" fill="white"/></svg>
          </Link>
          <Link href="#pricing" className="btn-outline inline-flex items-center gap-2 text-base py-4 px-8">
            Reba Ibiciro
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5d63ff] to-purple-400 border-2 border-white" />
            ))}
          </div>
          <div className="text-left">
            <div className="flex text-yellow-400 text-sm">{"★★★★★"}</div>
            <p className="text-xs text-gray-500">49 Ubuhamya busesuye</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Uko RoadReady Ikora</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Ni Application Ikorera Muri telefoni, mudasobwa ndetse no kuri murandasi.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hitamo Igiciro Cyikunogeye</h2>
            <p className="text-gray-500">Ihitiremo igiciro kikunogeye ugendeye k'igihe uzakorera.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl border ${plan.popular ? "border-[#5d63ff] shadow-lg shadow-[#5d63ff]/10" : "border-gray-200"} p-6 flex flex-col`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5d63ff] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Ibyiza
                  </span>
                )}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{plan.name[0]}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm"> RWF / {plan.period}</span>
                </div>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#5d63ff] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`mt-6 w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? "bg-[#5d63ff] text-white hover:bg-[#4a4fd6]" : "border border-[#5d63ff] text-[#5d63ff] hover:bg-[#5d63ff] hover:text-white"}`}>
                  Tangira
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Twandikire</h2>
          <p className="text-gray-500 mb-10">Turi hano Kubwawe! N'iki twagufasha?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
            <span>📍 KK 288 st, Kicukiro - Kigali</span>
            <span>📞 +250 785 171 717</span>
            <span>✉️ info@roadready.rw</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RoadReady — A <span className="text-[#5d63ff]">Binary Solutions</span> Company.
      </footer>
    </div>
  );
}
