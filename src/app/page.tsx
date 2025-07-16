import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
      <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-10 shadow-xl flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-md">
          Bem-vindo ao seu app de posts!
        </h1>

        <p className="text-lg text-white/80 mb-8 text-center">
          Crie, visualize e exclua posts de forma simples e prática.
        </p>

        <Image
          src="/logo.png"
          width={180}
          height={180}
          alt="Monkey"
          className="mb-8"
        />

        <div className="flex gap-6">
          <Link
            href="/create"
            className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all shadow-md"
          >
            Criar Post
          </Link>

          <Link
            href="/posts"
            className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all shadow-md"
          >
            Ver Posts
          </Link>
          <Link
            href="/posts"
            className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all shadow-md"
          >
            E
          </Link>
        </div>
      </div>
    </main>
  );
}
