import { useContext, useEffect, useRef } from "react";
import { BattleActorContext } from "../pages/Battle";
import { useSelector } from "@xstate/react";

export const CombatLog = () => {
  const battleActor = useContext(BattleActorContext);
  const log = useSelector(battleActor, (state) => state.context.combatLog);
  const logEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [log]);

  return (
    <div className="overflow-scroll h-40 w-80 m-auto mb-10 border-white border-2 rounded-xl">
        {log.map((line) => <p>{line}</p>)}
        <div ref={logEndRef} />
    </div>
  )
};
