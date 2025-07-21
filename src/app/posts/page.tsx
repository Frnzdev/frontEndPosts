"use client";

import RespostaEnv from "@/components/RespostaEnv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Post = {
  _id: string;
  titulo: string;
  description: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [enviado, setEnviado] = useState(false);
  const [modalExclude, setModalExclude] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api-posts-1obf.onrender.com/posts")
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    fetch(`https://api-posts-1obf.onrender.com/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts(posts.filter((post) => post._id !== id));
      })
      .then(() => setEnviado(true));
  };

  if (loading)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
        <p className="text-white text-xl animate-pulse">Carregando posts...</p>
      </main>
    );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
      <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-10 shadow-xl flex flex-col items-center max-w-2xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <Link href={"/"}>
            <HomeIcon size={32} className="text-white" />
          </Link>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            Lista de Posts
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full max-w-sm bg-white/10 border border-white/20 backdrop-blur-md p-3 rounded-xl shadow-md mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Digite o ID do post..."
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
          />
          <Link
            href={`/posts/${search}`}
            className="p-2 rounded-lg hover:bg-white/20 transition-all"
          >
            <SearchIcon size={24} className="text-white" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-white/80 text-lg">Nenhum post encontrado.</p>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col sm:flex-row items-start gap-4 bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow-md text-white/90 hover:bg-white/20 transition-all"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2 text-center sm:text-left break-words">
                    {post.titulo}
                  </h2>
                  <p className="mb-4 text-white/70 text-center sm:text-left break-words line-clamp-4">
                    {post.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/posts/${post._id}`}
                      className="w-full sm:w-auto text-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                    >
                      Ver Post
                    </Link>

                    <Link
                      href={`/edit/${post._id}`}
                      className="w-full sm:w-auto text-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-lg text-yellow-200 hover:bg-yellow-500/40 transition-all"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => {
                        setPostToDelete(post._id);
                        setModalExclude(true);
                      }}
                      className="w-full sm:w-auto text-center px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 hover:bg-red-500/40 transition-all"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/create"
          className="mt-10 border border-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all shadow-md"
        >
          <PlusIcon size={32} className="text-white" />
        </Link>
      </div>

      {modalExclude && postToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full text-white">
            <p className="text-lg text-center">
              Tem certeza que deseja excluir este post?
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => {
                  handleDelete(postToDelete);
                  setModalExclude(false);
                }}
                className="flex-1 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-xl hover:bg-red-500/40 transition-all text-red-200"
              >
                Sim, excluir
              </button>
              <button
                onClick={() => {
                  setModalExclude(false);
                }}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {enviado && (
        <RespostaEnv
          color="red"
          onClick={() => setEnviado(false)}
          text={"Post excluído com sucesso!"}
        />
      )}
    </main>
  );
}
