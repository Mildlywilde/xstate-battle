import { useMachine } from '@xstate/react';
import {battleMachine} from '../xstate/battleMachine';

export default function Battle() {
  const [state, send] = useMachine(battleMachine);

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

      {state.matches("enemyTurn") && (
        <div>
          <p>Enemy's turn!</p>
          <button onClick={() => send({ type: "ATTACK" })}>Attack</button>
        </div>
      )}

      {state.matches("endStep") && (
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

      <p>Player Health: {state.context.playerHealth}</p>
      <p>Enemy Health: {state.context.enemyHealth}</p>
    </div>
  );
}