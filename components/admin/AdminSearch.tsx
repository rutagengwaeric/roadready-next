"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function AdminSearch({ placeholder = "Search..." }: { placeholder?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [query, setQuery] = useState(searchParams.get("search") || "");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set("search", query);
        } else {
            params.delete("search");
        }
        // Delete page when searching so we go back to page 1
        params.delete("page");

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
            <div className="search-container" style={{ display: "flex", gap: 10, maxWidth: 500 }}>
                <div style={{ position: "relative", flex: 1 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={placeholder}
                        style={{
                            width: "100%", backgroundColor: "#1a1d2e", border: "1px solid #2a2d4a",
                            borderRadius: 12, padding: "12px 16px 12px 44px", color: "#fff",
                            fontSize: "1.4rem", outline: "none", fontFamily: "inherit", transition: "0.2s"
                        }}
                    />
                </div>
                <button type="submit" disabled={isPending} className="btn btn-primary" style={{ height: 48, paddingInline: 24, fontSize: "1.3rem", borderRadius: 12, minWidth: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isPending ? (
                        <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    ) : (
                        "Search"
                    )}
                </button>
            </div>
        </form>
    );
}
