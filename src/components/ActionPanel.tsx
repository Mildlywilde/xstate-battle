import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { BattleActorContext } from "../pages/Battle";

export const ActionPanel = () => {
  const battleActor = useContext(BattleActorContext);
  const state = useSelector(battleActor, (state) => state);
  const send = battleActor.send;

  return (
    <div>
      {state.matches("playerTurn") && (
        <button onClick={() => send({ type: "ATTACK" })}>Attack</button>
      )}
      {(state.matches("enemyTurnAction") || state.matches("enemyTurnInfo")) && (
        <button onClick={() => send({ type: "CONFIRM" })}>Confirm</button>
      )}
    </div>
  );
};
