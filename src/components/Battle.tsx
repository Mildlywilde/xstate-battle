import { useActor } from '@xstate/react';
import {battleMachine} from '../xstate/battleMachine';
import { StatusPanel } from './StatusPanel';

export const Battle = () => {
  const [state, send] = useActor(battleMachine, { 
    input: {
      playerHealth: 100,
      enemyHealth: 50
    }
  });

  return (
    <div>
      <h1>Battle!</h1>
      {state.matches("start") && (
        <div>
          <p>Press "Begin" to start the battle!</p>
          <button onClick={() => send({ type: "BEGIN" })}>Begin</button>
        </div>
      )}

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

      {state.matches("enemyEndStep") && (
        <div>
          <p>End of turn!</p>
          <button onClick={() => send({ type: "BEGIN" })}>Next turn</button>
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

      <StatusPanel name={"Player"} health={state.context.playerHealth}/>
      <StatusPanel name={"Enemy"} health={state.context.enemyHealth}/>
    </div>
  );
}