import { useContext } from "react";
import { BattleActorContext } from "../pages/Battle";
import { useSelector } from "@xstate/react";

export const CombatLog = () => {
  const battleActor = useContext(BattleActorContext);
  const log = useSelector(battleActor, (state) => state.context.combatLog);

  return (
    <div>
        {log.map((line) => <p>{line}</p>)}
    </div>
  )
};
