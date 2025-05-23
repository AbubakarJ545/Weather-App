import React from "react";

function InfoCard({ title, value }) {
  return (
    <div className="bg-gradient-to-tr from-green-900/50 via-teal-600/50 to-violet-700/50 bg-opacity-10 backdrop-blur-md rounded-xl p-3 shadow-md min-w-[140px] text-center">
      <p className="text-sm text-gray-300">{title}</p>
      <p className="text-lg font-semibold whitespace-pre-line">{value}</p>
    </div>
  );
}

export default InfoCard;
