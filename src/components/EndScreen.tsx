import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { BattleActorContext } from "../pages/Battle";

export const EndScreen = () => {
  const battleActor = useContext(BattleActorContext);
  const state = useSelector(battleActor, (state) => state);
  const send = battleActor.send;
  const winnerText = state.matches("playerWin") ? "You Win!" : "You Lose";
  return (
    <div>
      <h1>{winnerText}</h1>
      <button onClick={() => send({ type: "RESET" })}>Reset</button>
    </div>
  );
};
