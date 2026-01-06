import { useState } from "react";

export default function RPSGame() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const options = ["グー", "チョキ", "パー"];

  const playGame = (choice) => {
    setPlayerChoice(choice);
    const computer = options[Math.floor(Math.random() * options.length)];
    setComputerChoice(computer);

    if (choice === computer) {
      setResult("あいこ");
    } else if (
      (choice === "グー" && computer === "チョキ") ||
      (choice === "チョキ" && computer === "パー") ||
      (choice === "パー" && computer === "グー")
    ) {
      setResult("勝ち！");
    } else {
      setResult("負け…");
    }
  };
  
  return (
    <>
      <p>手を選んでください:</p>
      <div style={{ marginBottom: "20px" }}>
        {options.map((option) => (
          <button key={option} onClick={() => playGame(option)}>
            {option}
          </button>
        ))}
      </div>

      {playerChoice && (
        <div>
          <p>あなたの手: {playerChoice}</p>
          <p>コンピュータの手: {computerChoice}</p>
          <h3>{result}</h3>
        </div>
      )}
    </>
  );
}
