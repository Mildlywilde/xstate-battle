import { assign, setup } from "xstate";

export interface BattleContext {
    playerHealth: number;
    enemyHealth: number;
}

export const battleMachine = setup({
    types: {
        input: {} as {
            playerHealth: number;
            enemyHealth: number;
        },
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
    context: ({input}) => ({
        playerHealth: input.playerHealth,
        enemyHealth: input.enemyHealth
    }),
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
                    target: "enemyEndStep",
                }
            }
        },
        enemyEndStep: {
            always: [
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

