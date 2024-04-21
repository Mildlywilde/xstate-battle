import { assign, setup } from "xstate";
import { BattleContext } from "../types";

export const battleMachine = setup({
  types: {
    input: {} as BattleContext,
    context: {} as BattleContext,
    events: {} as
      | { type: "BEGIN" }
      | { type: "ATTACK" }
      | { type: "CONFIRM" }
      | { type: "RESET" },
  },
  guards: {
    isPlayerDead: ({ context }) => context.player.health <= 0,
    isEnemyDead: ({ context }) => context.enemy.health <= 0,
  },
}).createMachine({
  context: ({ input }) => ({
    player: input.player,
    enemy: input.enemy,
    combatLog: []
  }),
  initial: "start",
  states: {
    start: {
      on: {
        BEGIN: "playerTurn",
      },
    },
    playerTurn: {
      on: {
        ATTACK: {
          target: "playerEndStep",
          actions: assign({
            enemy: (event) => {
              const enemy = event.context.enemy;
              return { ...enemy, health: enemy.health - 10 };
            },
            combatLog: (event) => [
              ...event.context.combatLog, 
              `You hit the ${event.context.enemy.name} for 10 damage`
            ]
          }),
        },
      },
    },
    playerEndStep: {
      always: [
        {
          target: "playerWin",
          guard: "isEnemyDead",
        },
        {
          target: "enemyTurnAction",
        },
      ],
    },
    enemyTurnAction: {
      on: {
        CONFIRM: {
          target: "enemyTurnInfo",
          actions: assign({
            player: (event) => {
              const player = event.context.player;
              return { ...player, health: player.health - 10 };
            },
            combatLog: (event) => [
              ...event.context.combatLog, 
              `The ${event.context.enemy.name} hit you for 10 damage`
            ]
          }),
        },
      },
    },
    enemyTurnInfo: {
      on: {
        CONFIRM: {
          target: "enemyEndStep",
        },
      },
    },
    enemyEndStep: {
      always: [
        {
          target: "enemyWin",
          guard: "isPlayerDead",
        },
        {
          target: "playerTurn",
        },
      ],
    },
    // TODO: Can I reset back to the original input?
    playerWin: {
      on: {
        RESET: {
          target: "start",
          actions: assign({
            player: () => {
              return {
                name: "Player",
                health: 100
              }
            },
            enemy: () => {
              return {
                name: "Enemy",
                health: 100
              }
            },
            combatLog: () => []
          })
        },
      },
    },
    enemyWin: {
      on: {
        RESET: {
          target: "start",
          actions: assign({
            player: () => {
              return {
                name: "Player",
                health: 100
              }
            },
            enemy: () => {
              return {
                name: "Enemy",
                health: 50
              }
            },
            combatLog: () => []
          })
        },
      },
    },
  },
});
