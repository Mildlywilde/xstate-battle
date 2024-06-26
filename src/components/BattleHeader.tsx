import { useContext } from "react";
import { BattleActorContext } from "../pages/Battle";
import { useSelector } from "@xstate/react";
import { StatusPanel } from "./StatusPanel";

export const BattleHeader = () => {
  const battleActor = useContext(BattleActorContext);
  const state = useSelector(battleActor, (state) => state);
  const headerText = state.matches("playerTurn") ? "Your Turn" : "Enemy Turn";
  return (
    <div className="flex">
      <StatusPanel character={state.context.player} />
      <h1 className="w-96">{headerText}</h1>
      <StatusPanel character={state.context.enemy} />
    </div>
  );
};
