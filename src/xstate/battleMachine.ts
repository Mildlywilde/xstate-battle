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
            | { type: "CONFIRM"}
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
                ATTACK:{
                    target: "playerEndStep",
                    actions: assign({
                        enemyHealth: (event) => event.context.enemyHealth - Math.floor(Math.random() * 10)
                        // enemyHealth: (event) => event.context.enemyHealth -20
                    }),
                }
            }
        },
        playerEndStep: {
            always: [
                {
                    target: "playerWin",
                    guard: "isEnemyDead"
                },
                {
                    target: "enemyTurnAction"
                }
            ]
        },
        enemyTurnAction: {
            on: {
                CONFIRM: {
                    target: "enemyTurnInfo",
                    actions: assign({
                        playerHealth: (event) => event.context.playerHealth - Math.floor(Math.random() * 10)
                    }),
                }
            }
        },
        enemyTurnInfo: {
            on: {
                CONFIRM: {
                    target: "endStep",
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

