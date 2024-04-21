import { useActor, useSelector } from '@xstate/react';
import { battleMachine } from '../xstate/battleMachine';
import { StatusPanel } from './StatusPanel';
import { assertUnreachable } from '../helpers'
import { createContext, useContext } from 'react';
import { createActor } from 'xstate';


// setup react context for battle machine
const battleActor = createActor(battleMachine, {
  input: {
    player: {
      name: "Player",
      health: 100
    },
    enemy: {
      name: "Enemy",
      health: 50
    }
  }
});
battleActor.start()
const BattleActorContext = createContext(battleActor)

const StartPanel = () => { 
  const battleActor = useContext(BattleActorContext)
  const send = battleActor.send
  return (
    <div>
      <p>Press "Begin" to start the battle!</p>
      <button onClick={() => send({ type: "BEGIN" })}>Begin</button>
    </div>
  )
}



export const Battle = () => {
  const battleActor = useContext(BattleActorContext)
  const state = useSelector(battleActor, (state) => state)
  const send = battleActor.send

  return (
    <BattleActorContext.Provider value={battleActor}>
      <div>
        <h1>Battle!</h1>

        { 
          state.matches("start") 
          ? <StartPanel /> 
          : state.matches("playerTurn")
          ? <p>Player Turn</p>
          : state.matches("enemyTurnAction")
          ? <p>Enemy's Turn</p>
          : state.matches("enemyTurnInfo")
          ? <p>Enemy's Turn (info)</p>
          : state.matches("playerWin")
          ? <p>You Win!</p>
          : state.matches("enemyWin")
          ? <p>You Lose!</p>
          : assertUnreachable(state.value)
        }

        {state.matches("playerTurn") && (
          <div>
            <p>Player's turn!</p>
            <button onClick={() => send({ type: "ATTACK" })}>Attack</button>
          </div>
        )}

        {state.matches("enemyTurnAction") && (
          <div>
            <p>Enemy's turn!</p>
            <button onClick={() => send({ type: "CONFIRM" })}>Confirm</button>
          </div>
        )}

        {state.matches("enemyTurnInfo") && (
          <div>
            <p>Enemy Attacked!</p>
            <button onClick={() => send({ type: "CONFIRM" })}>Confirm</button>
          </div>
        )}

        {state.matches("playerWin") && (
          <div>
            <p>Player wins!</p>
          </div>
        )}
        {state.matches("enemyWin") && (
          <div>
            <p>Enemy wins!</p>
          </div>
        )}

        <StatusPanel character={state.context.player}/>
        <StatusPanel character={state.context.enemy}/>
      </div>
    </BattleActorContext.Provider>
  );
}