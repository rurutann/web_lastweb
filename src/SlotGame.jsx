import { useState, useEffect, useRef } from "react";
import watermelon from "./watermelon.png";
import grape from "./budou.png";
import cherry from "./cherry.png";

const symbols = [
  { name: "スイカ", img: watermelon },
  { name: "ぶどう", img: grape },
  { name: "さくらんぼ", img: cherry },
];

export default function SlotGame({ bet, coin, setCoin, onBack }) {
  const [reels, setReels] = useState([0, 0, 0]);
  const [stopped, setStopped] = useState([true, true, true]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");
  const timers = useRef([null, null, null]);

  // STARTボタン
  const start = () => {
    if (isSpinning || bet > coin) return;

    setResult("");
    setIsSpinning(true);
    setStopped([false, false, false]);

    // 賭け金を先に引く
    setCoin((c) => c - bet);

    timers.current.forEach((_, i) => {
      timers.current[i] = setInterval(() => {
        setReels((prev) => {
          const copy = [...prev];
          copy[i] = (copy[i] + 1) % symbols.length;
          return copy;
        });
      }, 100);
    });
  };

  // STOPボタン
  const stopReel = (index) => {
    if (!isSpinning || stopped[index]) return;

    clearInterval(timers.current[index]);

    setStopped((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  // 結果判定（1回のみ）
  useEffect(() => {
    if (!isSpinning) return;
    if (!stopped.every(Boolean)) return;

    setIsSpinning(false);

    const [a, b, c] = reels;

    if (a === b && b === c) {
      setResult("🎉 大当たり！5倍獲得！ 🎉");
      setCoin((coin) => coin + bet * 5);
    } else {
      setResult("残念…");
    }
  }, [stopped, reels, isSpinning, bet, setCoin]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>スロットゲーム</h1>

      <p style={{ fontSize: "22px" }}>所持コイン：{coin}</p>
      <p style={{ fontSize: "18px" }}>賭け金：{bet}</p>
      <p style={{ fontSize: "18px" }}>揃えば：{bet * 5} コイン</p>

      {/* リール */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "20px",
        }}
      >
        {reels.map((r, i) => (
          <div key={i}>
            <img
              src={symbols[r].img}
              alt={symbols[r].name}
              style={{ width: "120px", height: "120px" }}
            />
            <br />
            <button
              onClick={() => stopReel(i)}
              disabled={!isSpinning || stopped[i]}
              style={{
                marginTop: "50px",
                width: "160px",
                height: "70px",
                fontSize: "26px",
                fontWeight: "bold",
              }}
            >
              STOP
            </button>
          </div>
        ))}
      </div>

      {/* STARTボタン（半分サイズ） */}
      <button
        onClick={start}
        disabled={isSpinning || bet > coin}
        style={{
          fontSize: "12px",      // 半分
          padding: "6px 20px",   // 半分
        }}
      >
        START
      </button>

      {/* 結果表示 */}
      {result && <h2 style={{ marginTop: "20px" }}>{result}</h2>}

      {/* ホームに戻る（半分サイズ） */}
      <button
        onClick={onBack}
        style={{
          marginTop: "20px",
          fontSize: "10px",      // 半分
          padding: "5px 15px",   // 半分
        }}
      >
        ホームに戻る
      </button>
    </div>
  );
}
