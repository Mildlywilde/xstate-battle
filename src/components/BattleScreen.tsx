import { useSelector } from "@xstate/react"
import { useContext } from "react"
import { BattleActorContext } from "../pages/Battle"
import { BattleHeader } from "./BattleHeader"
import { ActionPanel } from "./ActionPanel"

export const BattleScreen = () => {
    const battleActor = useContext(BattleActorContext)
    const state = useSelector(battleActor, (state) => state)
  
    return(
      <div>
        <p>current state: {state.value}</p>
        <BattleHeader/>
        <ActionPanel/>
      </div>
    )
  }