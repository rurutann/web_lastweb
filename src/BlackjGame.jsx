import { useState } from "react";

const drawCard = () => Math.floor(Math.random() * 10) + 1;
const sum = (cards) => cards.reduce((a, b) => a + b, 0);

export default function BlackJGame({ bet, coin, setCoin, onBack }) {
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [result, setResult] = useState("");
  const [playing, setPlaying] = useState(false);

  const start = () => {
    if(bet > coin) return;

    setCoin(coin => coin - bet);
    setPlayer([drawCard(), drawCard()]);
    setDealer([drawCard(), drawCard()]);
    setResult("");
    setPlaying(true);
  };

  const hit = () => {
    if (!playing) return;

    const hand = [...player, drawCard()];
    setPlayer(hand);

    if (sum(hand) > 21) {
      setResult("バースト！負け");
      setPlaying(false);
    }
  };

  const stand = () => {
    if (!playing) return;

    let d = [...dealer];
    while (sum(d) < 17) d.push(drawCard());
    setDealer(d);

    const ps = sum(player);
    const ds = sum(d);

    if (ds > 21 || ps > ds) {
      setResult("勝ち！");
      setCoin(coin => coin + bet * 2);
    } else if (ps < ds) {
      setResult("負け");
    } else {
      setResult("引き分け");
      // 引き分けの時に賭け金を返したい場合はここに setCoin(c => c + bet); を追加してください
    }

    setPlaying(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ブラックジャック</h1>

      <p style={{ fontSize: "20px" }}>
        所持コイン：<strong>{coin}</strong>
      </p>
      <p>賭け金：{bet}</p>
      
      <p>勝利時報酬：{bet * 2}</p>

      <p style={{ fontSize: "24px" }}>
        あなた：{player.join(", ")}（{sum(player)}）
      </p>

      <p style={{ fontSize: "24px" }}>
        ディーラー：
        {playing ? " ?" : ` ${dealer.join(", ")}（${sum(dealer)}）`}
      </p>

      {!playing && <button onClick={start}>START</button>}
      {playing && (
        <>
          <button onClick={hit}>HIT</button>
          <button onClick={stand}>STAND</button>
        </>
      )}

      {result && <h2>{result}</h2>}

      <button onClick={onBack}>ホームに戻る</button>
    </div>
  );
}