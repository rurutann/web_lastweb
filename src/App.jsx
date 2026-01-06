import { useState } from "react";
import useCoin from "./useCoin";

import NumberGuessGame from "./NumberGuessGame";
import SlotGame from "./SlotGame";
import SprGame from "./sprgame";
import BlackJGame from "./BlackJGame";
import DartGame from "./DarGame";

import slotImg from "./slot.png";
import mgame from "./mathgame.png";
import rgame from "./rps.png";
import blackjackImg from "./blackjack.png";
import dartImg from "./dart.png";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const { coin, setCoin, loaded } = useCoin();
  
  const [bet, setBet] = useState(0);

  if (!loaded)
    return <div style={{ textAlign: "center", marginTop: 50 }}>読み込み中…</div>;

  return (
    <>
      {/* ===== ホーム画面 ===== */}
      {currentScreen === "home" && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h1>ミニゲーム集</h1>

          <p style={{ fontSize: "22px" }}>
            所持コイン：<strong>{coin}</strong>
          </p>

          {/* ===== 賭け金設定 ===== */}
          <div style={{ margin: "20px 0" }}>
            <h3>賭け金設定（0 〜 {coin}）</h3>
            <input
              type="number"
              min="0"
              max={coin}
              step="1"
              value={bet}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!Number.isNaN(value)) {
                  setBet(Math.min(Math.max(0, value), coin));
                }
              }}
              style={{ fontSize: "22px", width: "140px", textAlign: "center" }}
            />
            <div style={{ marginTop: "10px" }}>
              <input
                type="range"
                min="0"
                max={coin}
                step="1"
                value={bet}
                onChange={(e) => setBet(Number(e.target.value))}
                style={{ width: "300px" }}
              />
            </div>
          </div>

          {/* ===== ゲーム選択 ===== */}
          <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px" }}>
            <button disabled={bet < 0 || bet > coin} onClick={() => setCurrentScreen("slot")}>
              <img src={slotImg} width="180" />
              <div>スロット</div>
            </button>
            <button disabled={bet < 0 || bet > coin} onClick={() => setCurrentScreen("sprgame")}>
              <img src={rgame} width="180" />
              <div>じゃんけん</div>
            </button>
            <button disabled={bet < 0 || bet > coin} onClick={() => setCurrentScreen("numberGuess")}>
              <img src={mgame} width="180" />
              <div>数字当て</div>
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px" }}>
            <button disabled={bet < 0 || bet > coin} onClick={() => setCurrentScreen("blackjack")}>
              <img src={blackjackImg} width="180" />
              <div>ブラックジャック</div>
            </button>
            <button disabled={bet < 0 || bet > coin} onClick={() => setCurrentScreen("dart")}>
              <img src={dartImg} width="180" />
              <div>ダーツ</div>
            </button>
          </div>
        </div>
      )}

      {/* ===== 各ゲーム ===== */}
      {currentScreen === "numberGuess" && (
        <NumberGuessGame bet={bet} coin={coin} setCoin={setCoin} onBack={() => setCurrentScreen("home")} />
      )}
      {currentScreen === "slot" && (
        <SlotGame bet={bet} coin={coin} setCoin={setCoin} onBack={() => setCurrentScreen("home")} />
      )}
      {currentScreen === "sprgame" && (
        <SprGame bet={bet} coin={coin} setCoin={setCoin} onBack={() => setCurrentScreen("home")} />
      )}
      {currentScreen === "blackjack" && (
        <BlackJGame bet={bet} coin={coin} setCoin={setCoin} onBack={() => setCurrentScreen("home")} />
      )}
      {currentScreen === "dart" && (
        <DartGame bet={bet} coin={coin} setCoin={setCoin} onBack={() => setCurrentScreen("home")} />
      )}
    </>
  );
}
