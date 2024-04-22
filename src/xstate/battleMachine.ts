import { assign, setup } from "xstate";
import { BattleContext } from "../types";

export const battleMachine = setup({
  types: {
    input: {} as BattleContext,
    context: {} as BattleContext,
    events: {} as
      | { type: "BEGIN" }
      | { type: "ATTACK"; damage: number }
      | { type: "CONFIRM"; damage: number }
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
            enemy: ({event, context}) => {
              const enemy = context.enemy;
              return { ...enemy, health: enemy.health - event.damage };
            },
            combatLog: ({event, context}) => [
              ...context.combatLog, 
              `You hit the ${context.enemy.name} for ${event.damage} damage`
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
            player: ({event, context}) => {
              const player = context.player;
              return { ...player, health: player.health - event.damage };
            },
            combatLog: ({event, context}) => [
              ...context.combatLog, 
              `The ${context.enemy.name} hit you for ${event.damage} damage`
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
