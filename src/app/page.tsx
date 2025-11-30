import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Container */}
      <section className="max-w-xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="w-full h-48 flex items-center justify-center rounded-2xl shadow-lg bg-white">
          <Image
            src="/logo.webp"
            alt="Logo DompetKu"
            width={280}
            height={180}
            className="object-contain"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-green-900">
          Atur Keuangan Tanpa Ribet
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-zinc-600">
          Setiap transaksi tercatat.
          <br />
          Setiap uang terkontrol.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-6">
          <Link
            href="/login"
            className="px-6 py-2 rounded-xl border border-zinc-600 text-zinc-800 hover:bg-zinc-700 hover:text-white transition"
          >
            Log In
          </Link>

          <Link
            href="/signUp"
            className="px-6 py-2 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
          >
            Sign Up
          </Link>
        </div>
      </section>
    </main>
  );
}
