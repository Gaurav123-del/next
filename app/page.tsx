"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="bg-black text-white min-h-screen">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="text-xl font-bold">Tradigoo</div>

        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <span>Features</span>
          <span>How it Works</span>
          <span>Pricing</span>
        </div>

        <div className="flex gap-3">
          <button
  onClick={() => router.push("/auth/login")}
  className="text-sm text-gray-300"
>
  Login
</button>

          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">
          New v2.0 – The intelligent sourcing OS
        </span>

        <h1 className="text-5xl md:text-6xl font-bold mt-6">
          Sourcing <span className="text-blue-500">Reimagined.</span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl mx-auto">
          The first AI-powered B2B platform connecting retailers with verified
          wholesalers. No middlemen. Zero risk.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-blue-600 px-6 py-3 rounded-full font-medium"
          >
            Start Sourcing →
          </button>
          <button className="border border-gray-700 px-6 py-3 rounded-full">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-24 grid md:grid-cols-3 gap-6">
        {[
          "Bank-Grade Escrow",
          "AI Supplier Matching",
          "End-to-End Logistics",
          "Deep Vetting",
          "Smart Contracts",
          "Market Intelligence",
        ].map((feature) => (
          <div
            key={feature}
            className="bg-[#111] p-6 rounded-xl border border-gray-800"
          >
            <h3 className="font-semibold mb-2">{feature}</h3>
            <p className="text-sm text-gray-400">
              Secure, transparent, and intelligent trading experience.
            </p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-900 to-black">
        <h2 className="text-4xl font-bold">
          Ready to revolutionize your supply chain?
        </h2>

        <p className="text-gray-300 mt-4">
          Source faster, safer, and smarter with Tradigoo.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold"
          >
            Get Started Free
          </button>
          <button className="border border-gray-500 px-6 py-3 rounded-full">
            Talk to Sales
          </button>
        </div>
      </section>

    </main>
  );
}
