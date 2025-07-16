"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  titulo: string;
  description: string;
}

export default function CreatePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleCreate = () => {
    if (!title || !description) {
      alert("Preencha todos os campos");
      return;
    }

    fetch(`https://api-posts-1obf.onrender.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: title,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((newPost: Post) => {
        setPosts([...posts, newPost]);
        setTitle("");
        setDescription("");
        setEnviado(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao criar post.");
      });
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
      <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-10 shadow-xl flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-md">
          Criar Novo Post
        </h1>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          rows={4}
        />

        <button
          onClick={handleCreate}
          className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all shadow-md mb-4"
        >
          Criar Post
        </button>

        <Link
          href="/posts"
          className="text-white/80 hover:text-white transition-all underline"
        >
          Ver Posts
        </Link>
      </div>

      {enviado && (
        <div className="absolute top-6 right-6 bg-green-200/10 border border-green-300/20 backdrop-blur-lg rounded-xl p-6 shadow-lg flex items-center gap-4 text-green-100">
          <span className="text-lg font-semibold drop-shadow-md">
            Post criado com sucesso!
          </span>
          <button
            onClick={() => setEnviado(false)}
            className="bg-green-300/10 border border-green-300/20 rounded-full px-3 py-1 text-green-100 hover:bg-green-300/20 transition-all"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}
