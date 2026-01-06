import { useState } from "react";
import rockImg from "./rock.png";
import paperImg from "./paper.png";
import scissorsImg from "./scissors.png";

const options = [
  { name: "グー", img: rockImg },
  { name: "パー", img: paperImg },
  { name: "チョキ", img: scissorsImg },
];

export default function SprGame({ bet, coin, setCoin, onBack }) {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    if (bet > coin) return;

    setPlayerChoice(choice.name);

    const computer = options[Math.floor(Math.random() * options.length)];
    setComputerChoice(computer.name);

    // あいこ
    if (choice.name === computer.name) {
      setResult("あいこ");
      return;
    }

    const win =
      (choice.name === "グー" && computer.name === "チョキ") ||
      (choice.name === "チョキ" && computer.name === "パー") ||
      (choice.name === "パー" && computer.name === "グー");

    if (win) {
      setResult("あなたの勝ち！2倍獲得！");
      setCoin(coin + bet);
    } else {
      setResult("コンピュータの勝ち…");
      setCoin(coin - bet);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>じゃんけん</h1>

      <p>所持コイン：{coin}</p>
      <p>賭け金：{bet}</p>
      
      <p>勝利時報酬：{bet * 2}</p>

      <p>手を選んでください</p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => playGame(option)}
            disabled={bet > coin}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: bet > coin ? 0.5 : 1,
            }}
          >
            <img
              src={option.img}
              alt={option.name}
              style={{ width: "100px", height: "100px" }}
            />
          </button>
        ))}
      </div>

      {playerChoice && (
        <div style={{ marginTop: "20px" }}>
          <p>あなた：{playerChoice}</p>
          <p>コンピュータ：{computerChoice}</p>
          <h2>{result}</h2>
        </div>
      )}

      <button onClick={onBack} style={{ marginTop: "20px" }}>
        ホームに戻る
      </button>
    </div>
  );
}