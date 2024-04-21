import { useSelector } from "@xstate/react"
import { useContext } from "react"
import { BattleActorContext } from "../pages/Battle"
import { assertUnreachable } from "../helpers"

export const EndScreen = () => {
    const battleActor = useContext(BattleActorContext)
    const state = useSelector(battleActor, (state) => state)
    return (
      <div>
        {
          state.matches("playerWin")
          ? <h1>You Win!</h1>
          : state.matches("enemyWin")
          ? <h1>You Lose</h1>
          : assertUnreachable(state.value)
        }
      </div>
    )
  }