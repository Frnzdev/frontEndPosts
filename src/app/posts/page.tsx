"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Post = {
  _id: string;
  titulo: string;
  description: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
    }).then(() => {
      setPosts(posts.filter((post) => post._id !== id));
    });
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

        {posts.length === 0 ? (
          <p className="text-white/80 text-lg">Nenhum post encontrado.</p>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex items-start gap-4 bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow-md text-white/90 hover:bg-white/20 transition-all"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{post.titulo}</h2>
                  <p className="mb-4 text-white/70">{post.description}</p>

                  <div className="flex gap-4">
                    <Link
                      href={`/posts/${post._id}`}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                    >
                      Ver Post
                    </Link>

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 hover:bg-red-500/40 transition-all"
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
    </main>
  );
}
