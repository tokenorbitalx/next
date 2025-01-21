"use client";

import { useState, useRef } from "react";

interface IconProps {
  name: string;
  image: string;
  appId: string;
  path: string;
}

const Icon = ({ name, image, appId, path }: IconProps) => {
  const openApp = () => {
    const url = `https://worldcoin.org/mini-app?app_id=${appId}&path=${encodeURIComponent(path)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="aspect-square">
      <button
        className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-custom cursor-pointer transition-all hover:shadow-lg hover:scale-105 w-full h-full"
        onClick={openApp}
      >
        <div className="w-16 h-16 flex items-center justify-center mb-2">
          <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
        </div>
        <p className="text-sm font-medium text-center text-primary">{name}</p>
      </button>
    </div>
  );
};

const icons: IconProps[] = [
  { name: "Meme Wallet", image: "https://wallet-bussines.github.io/meme.png", appId: "app_013bbbd7b5803a25c8d10d10299608e7", path: "/dashboard" },
  { name: "Oro", image: "https://wallet-bussines.github.io/fichas-de-casino.png", appId: "app_f1e44837a5e3c2af4da8925b46027645", path: "/dashboard" },
  { name: "Vault", image: "https://wallet-bussines.github.io/conejo-de-pascua.png", appId: "app_ee968e983074cb090e6f12cd75b63bb3", path: "/dashboard" },
  { name: "Dna", image: "https://wallet-bussines.github.io/4bf0b529-6ad6-46fb-98e5-6f948c3be6a0.png", appId: "app_8e407cfbae7ae51c19b07faff837aeeb", path: "/dashboard" },
  { name: "NFT", image: "https://cryptologos.cc/logos/theta-theta-logo.png", appId: "app_15daccf5b7d4ec9b7dbba044a8fdeab5", path: "/dashboard" },
  { name: "Orbital-X", image: "https://wallet-bussines.github.io/orbita.png", appId: "app_e293fcd0565f45ca296aa317212d8741", path: "/dashboard" },
];

export default function IconGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
      {icons.map((icon) => (
        <Icon key={icon.name} {...icon} />
      ))}
    </div>
  );
}

