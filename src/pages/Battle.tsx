import { useSelector } from '@xstate/react';
import { battleMachine } from '../xstate/battleMachine';
import { createContext, useContext } from 'react';
import { createActor } from 'xstate';
import { StartScreen } from '../components/StartScreen';
import { EndScreen } from '../components/EndScreen';
import { BattleScreen } from '../components/BattleScreen';

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
export const BattleActorContext = createContext(battleActor)

export const Battle = () => {
  const battleActor = useContext(BattleActorContext)
  const state = useSelector(battleActor, (state) => state)

  return (
    <BattleActorContext.Provider value={battleActor}>
      <div>
        { 
          state.matches("start") 
          ? <StartScreen />
          : state.matches("playerWin")
          ? <EndScreen/>
          : state.matches("enemyWin")
          ? <EndScreen/>
          : <BattleScreen/>
        }
      </div>
    </BattleActorContext.Provider>
  );
}