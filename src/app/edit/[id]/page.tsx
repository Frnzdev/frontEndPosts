"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RespostaEnv from "@/components/RespostaEnv";

type Post = {
  _id: string;
  titulo: string;
  description: string;
};

export default function EditPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api-posts-1obf.onrender.com/posts/id/${id}`)
      .then((res) => res.json())
      .then((data: Post) => {
        setPost(data);
        setTitle(data.titulo);
        setDescription(data.description);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    if (!title || !description) {
      alert("Preencha todos os campos.");
      return;
    }

    fetch(`https://api-posts-1obf.onrender.com/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: title,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((data: Post) => {
        setEnviado(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao atualizar o post.");
      });
  };

  if (loading)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
        <p className="text-white text-xl animate-pulse">Carregando post...</p>
      </main>
    );

  if (!post)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
        <p className="text-white text-xl">Post não encontrado.</p>
      </main>
    );

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-200/30 to-white/10 backdrop-blur-md">
      <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-10 shadow-xl flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-md">
          Editar Post
        </h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          placeholder="Título"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          placeholder="Descrição"
          rows={4}
        />

        <button
          onClick={handleEdit}
          className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all shadow-md mb-4"
        >
          Salvar Alterações
        </button>

        <Link
          href="/posts"
          className="text-white/80 hover:text-white transition-all underline"
        >
          Voltar para lista
        </Link>
      </div>
      {enviado && (
        <RespostaEnv
          color="yellow"
          text="Post atualizado com sucesso"
          onClick={() => setEnviado(false)}
        />
      )}
    </main>
  );
}
