import { assign, setup } from "xstate";

export interface BattleContext {
    playerHealth: number;
    enemyHealth: number;
}

export const battleMachine = setup({
    types: {
        context: {} as {
            playerHealth: number;
            enemyHealth: number;
        },
        events: {} as 
            | { type: "BEGIN" }
            | { type: "ATTACK" }
    },
    actions: {
        begin: () => {},
        attack: () => {},
    },
    guards: {
        isPlayerDead: ({context}) => context.playerHealth <= 0,
        isEnemyDead: ({context}) => context.enemyHealth <= 0
    }
}).createMachine({
    context: {
        playerHealth: 100,
        enemyHealth: 100,
    },
    initial: "start",
    states: {
        start: {
            on: {
                BEGIN: "playerTurn"
            }
        },
        playerTurn: {
            on: {
                ATTACK: {
                    target: "enemyTurn",
                    actions: assign({
                        enemyHealth: (event) => event.context.enemyHealth - Math.floor(Math.random() * 10)
                    }),
                }
            }
        },
        enemyTurn: {
            on: {
                ATTACK: {
                    target: "endStep",
                    actions: assign({
                        playerHealth: (event) => event.context.playerHealth - Math.floor(Math.random() * 10)
                    }),
                }
            }
        },
        endStep: {
            always: [
                {
                    target: "playerWin",
                    guard: "isEnemyDead"
                },
                {
                    target: "enemyWin",
                    guard: "isPlayerDead"
                },
                {
                    target: "playerTurn"
                }
            ]
        },
        playerWin: {
            type: "final"
        },
        enemyWin: {
            type: "final"
        }
    }
});

