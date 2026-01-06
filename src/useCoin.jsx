import { useState, useEffect } from "react";

const COIN_KEY = "myGameCoin";
const INITIAL_COIN = 1000;

export default function useCoin() {
  const [coin, setCoin] = useState(INITIAL_COIN);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COIN_KEY);
    if (saved !== null) setCoin(Number(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(COIN_KEY, coin);
  }, [coin, loaded]);

  const updateCoin = (update) => {
    setCoin((prev) => (typeof update === "function" ? update(prev) : update));
  };

  return { coin, setCoin: updateCoin, loaded };
}
