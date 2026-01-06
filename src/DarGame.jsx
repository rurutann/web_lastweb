import { useState, useRef } from "react";

const points = [10, 20, 30, 40, 50]; // ダーツの得点例

export default function DartGame({ bet, coin, setCoin, onBack }) {
  const [currentPoint, setCurrentPoint] = useState(0);       // 回転中の得点
  const [playerScores, setPlayerScores] = useState([]);      // プレイヤーのスコア配列
  const [dealerScores, setDealerScores] = useState([]);      // ディーラーのスコア配列
  const [round, setRound] = useState(1);                     // 現在のラウンド（1~3）
  const [isSpinning, setIsSpinning] = useState(false);       // 回転中かどうか
  const [result, setResult] = useState("");                  // 勝敗
  const timer = useRef(null);

  // STARTボタン
  const start = () => {
    if (round > 3 || isSpinning) return;
    if (bet > coin) return; // コイン不足チェック

    setIsSpinning(true);

    timer.current = setInterval(() => {
      setCurrentPoint(Math.floor(Math.random() * points.length));
    }, 50); // 0.05秒ごとに変化
  };

  // STOPボタン
  const stop = () => {
    if (!isSpinning) return;

    clearInterval(timer.current);
    setIsSpinning(false);

    const player = points[currentPoint];
    const dealer = points[Math.floor(Math.random() * points.length)];

    setPlayerScores([...playerScores, player]);
    setDealerScores([...dealerScores, dealer]);

    if (round === 3) {
      // 3ラウンド終了したら勝敗判定
      const playerTotal = [...playerScores, player].reduce((a, b) => a + b, 0);
      const dealerTotal = [...dealerScores, dealer].reduce((a, b) => a + b, 0);

      if (playerTotal > dealerTotal) {
        setResult(`あなたの勝ち！ (${playerTotal} vs ${dealerTotal})`);
        // 勝った場合：賭け金を引いた後、3倍を加算
        setCoin((c) => c - bet + bet * 3); 
      } else if (playerTotal < dealerTotal) {
        setResult(`ディーラーの勝ち (${playerTotal} vs ${dealerTotal})`);
        setCoin((c) => c - bet); // 負けた場合：賭け金を引く
      } else {
        setResult(`引き分け (${playerTotal} vs ${dealerTotal})`);
        // 引き分けはコイン変動なし
      }
    }

    setRound(round + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>ダーツゲーム（3ラウンド）</h1>

      <p>所持コイン: {coin}</p>
      
      <p>賭け金: {bet}</p>
      <p>勝利時報酬 {bet * 3}</p>

      <p>ラウンド: {round > 3 ? 3 : round} / 3</p>
      <p>的の得点: <strong>{points[currentPoint]}</strong></p>

      {!isSpinning && round <= 3 && (
        <button
          onClick={start}
          style={{ fontSize: "24px", padding: "10px 40px" }}
          disabled={bet > coin}
        >
          START
        </button>
      )}

      {isSpinning && (
        <button
          onClick={stop}
          style={{ fontSize: "24px", padding: "10px 40px" }}
        >
          STOP
        </button>
      )}

      {playerScores.length > 0 && (
        <>
          <h3>あなたの得点: {playerScores.join(", ")}</h3>
          <h3>ディーラーの得点: {dealerScores.join(", ")}</h3>
        </>
      )}

      {result && <h2>{result}</h2>}

      <button
        onClick={onBack}
        style={{ marginTop: "20px", fontSize: "16px", padding: "5px 20px" }}
      >
        ホームに戻る
      </button>
    </div>
  );
}