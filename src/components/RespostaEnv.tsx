import React from "react";

interface RespostaEnvI {
  text: string;
  color: "green" | "yellow" | "red";
  onClick: () => void;
}

const colorStyles = {
  green: {
    bg: "bg-green-200/10",
    border: "border-green-300/20",
    hover: "hover:bg-green-300/20",
  },
  yellow: {
    bg: "bg-yellow-200/10",
    border: "border-yellow-300/20",
    hover: "hover:bg-yellow-300/20",
  },
  red: {
    bg: "bg-red-200/10",
    border: "border-red-300/20",
    hover: "hover:bg-red-300/20",
  },
};

export default function RespostaEnv({ text, onClick, color }: RespostaEnvI) {
  const styles = colorStyles[color];

  return (
    <div
      className={`absolute top-6 right-6 ${styles.bg} border ${styles.border} backdrop-blur-lg rounded-xl p-6 shadow-lg flex items-center gap-4 text-green-100`}
    >
      <span className="text-lg font-semibold drop-shadow-md">{text}</span>
      <button
        onClick={onClick}
        className={`bg-transparent border ${styles.border}  rounded-full px-3 py-1 text-green-100 ${styles.hover} transition-all`}
      >
        ✕
      </button>
    </div>
  );
}
