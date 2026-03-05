export default function Loading() {
    return (
        <div className="bg-[#f9f5ff] min-h-screen text-[#202842] flex flex-col">
            {/* ══ HEADER SKELETON ══ */}
            <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-100 px-20">
                <div className="mx-auto px-6 h-[64px] flex items-center justify-between">
                    <div className="flex items-center gap-6 w-full">
                        {/* Logo skeleton */}
                        <div className="w-[120px] h-[42px] bg-gray-200 rounded-md animate-pulse"></div>

                        {/* Nav links skeleton */}
                        <div className="hidden md:flex items-center gap-8 mr-auto">
                            <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Auth buttons skeleton */}
                    <div className="flex items-center gap-2 ml-auto">
                        <div className="hidden sm:block w-20 h-[38px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-24 h-[38px] bg-[#5d6eff]/40 rounded animate-pulse"></div>
                    </div>
                </div>
            </header>

            {/* ══ HERO SKELETON ══ */}
            <section className="bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-gray-100/50 animate-pulse"></div>
                <div className="max-w-[1160px] mx-auto px-6 py-14 md:py-20 flex flex-wrap-reverse md:flex-nowrap items-center gap-10 relative z-10">

                    <div className="w-full md:w-1/2">
                        {/* Badge skeleton */}
                        <div className="w-48 h-8 bg-gray-300 rounded-full mb-6 animate-pulse"></div>

                        {/* Title skeleton */}
                        <div className="w-[80%] h-16 md:h-24 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
                        <div className="w-[60%] h-16 md:h-24 bg-gray-300 rounded-lg mb-6 animate-pulse"></div>

                        {/* Subtitle skeleton */}
                        <div className="w-full h-10 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
                        <div className="w-[85%] h-10 bg-gray-300 rounded-lg mb-8 animate-pulse"></div>

                        {/* Action buttons skeleton */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <div className="w-40 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="w-36 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Social proof skeleton */}
                        <div className="flex items-center gap-6 flex-wrap pt-6 border-t border-gray-300/30">
                            <div>
                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
                                    ))}
                                </div>
                                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-gray-100 animate-pulse" style={{ marginLeft: i > 1 ? -8 : 0 }}></div>
                                    ))}
                                </div>
                                <div className="w-40 h-5 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <div className="w-full max-w-[480px] aspect-[5/4] bg-gray-300 rounded-2xl animate-pulse drop-shadow-xl"></div>
                    </div>
                </div>
            </section>

            {/* ══ STATS STRIP SKELETON ══ */}
            <div className="bg-white border-y border-gray-100">
                <div className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-24 h-10 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
