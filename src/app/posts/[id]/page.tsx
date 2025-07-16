"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  _id: string;
  titulo: string;
  description: string;
};

export default function ByIdPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api-posts-1obf.onrender.com/posts/id/${id}`)
      .then((res) => res.json())
      .then((data: Post) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
        <h1 className="text-white text-xl animate-pulse">Carregando...</h1>
      </main>
    );

  if (!post)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
        <h1 className="text-white text-xl">Post não encontrado.</h1>
      </main>
    );

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
      <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-10 shadow-xl max-w-xl w-full">
        <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-md">
          {post.titulo}
        </h1>
        <p className="text-white/80 text-lg mb-8">{post.description}</p>

        <Link
          href="/posts"
          className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all shadow-md"
        >
          Voltar para lista
        </Link>
      </div>
    </main>
  );
}
