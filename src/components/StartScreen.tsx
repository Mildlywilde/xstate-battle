import { useContext } from "react"
import { BattleActorContext } from "../pages/Battle"

export const StartScreen = () => { 
    const battleActor = useContext(BattleActorContext)
    const send = battleActor.send
    return (
      <div>
        <h1>Xstate Battle</h1>
        <p>Press "Begin" to start the battle!</p>
        <button onClick={() => send({ type: "BEGIN" })}>Begin</button>
      </div>
    )
  }