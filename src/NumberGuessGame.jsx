import { useState } from "react";

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function NumberGuessGame({ bet, coin, setCoin, onBack }) {
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  // 勝利処理済みフラグ
  const [rewarded, setRewarded] = useState(false);

  const startGame = () => {
    if (bet > coin) return;
    setPreviousGuesses([]);
    setRandomNumber(generateRandomNumber());
    setGameStarted(true);
    setGameFinished(false);
    setRewarded(false);

    // 賭け金を先に引く（0以下にならない安全装置）
    setCoin((c) => Math.max(c - bet, 0));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!gameStarted || gameFinished) return;

    const guessField = event.target.elements.guessField;
    const newUserGuess = Number(guessField.value);
    setPreviousGuesses((prev) => [...prev, newUserGuess]);

    guessField.value = "";
    guessField.focus();
  };

  const guessCount = previousGuesses.length;
  const userGuess = guessCount > 0 ? previousGuesses[guessCount - 1] : null;
  const gameClear = userGuess === randomNumber;
  const gameOver = guessCount >= 10;

  // 勝利時コイン加算（1回だけ）
  if (gameClear && !rewarded) {
    setCoin((c) => c + bet * 2); // 勝ったら掛金2倍返金
    setRewarded(true);
    setGameFinished(true);
    setGameStarted(false);
  }

  if (gameOver && !gameClear && !gameFinished) {
    setGameFinished(true);
    setGameStarted(false);
  }

  const higherGuesses = previousGuesses.filter((g) => g > randomNumber);
  const lowerGuesses = previousGuesses.filter((g) => g < randomNumber);

  let lastResultMessage = "間違いです！";
  if (gameClear) lastResultMessage = "🎉 おめでとう！正解です！ 🎉";
  else if (gameOver) lastResultMessage = "ゲームオーバー…";

  let lastResultColor = "";
  if (gameClear) lastResultColor = "lightgreen";
  else if (userGuess != null) lastResultColor = "#ffcccc";

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>数字当てゲーム</h1>
      <p>1〜100までの数字を10回以内に当ててください。</p>

      <p>所持コイン：{coin}</p>
      <p>賭け金：{bet}</p>
      <p>勝利時報酬：{bet * 2} コイン</p>

      {!gameStarted && !gameFinished && (
        <button onClick={startGame} disabled={bet > coin} style={{ marginBottom: "15px" }}>
          ゲーム開始
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="guessField"
          min="1"
          max="100"
          required
          disabled={!gameStarted || gameFinished}
        />
        <input type="submit" value="予想する" disabled={!gameStarted || gameFinished} />
      </form>

      {previousGuesses.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>大きい:</strong> {higherGuesses.join(" ")}</p>
          <p><strong>小さい:</strong> {lowerGuesses.join(" ")}</p>

          <p style={{ backgroundColor: lastResultColor, padding: "8px" }}>
            {lastResultMessage}
          </p>

          {!gameClear && userGuess != null && !gameOver && (
            <p>{userGuess < randomNumber ? "最後の予想は小さすぎます！" : "最後の予想は大きすぎます！"}</p>
          )}
        </div>
      )}

      {gameFinished && (
        <button onClick={startGame} style={{ marginTop: "10px" }}>
          もう一度遊ぶ
        </button>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>ホームに戻る</button>
      </div>
    </div>
  );
}
