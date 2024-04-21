import { assign, setup } from "xstate";

export interface Character {
    name: string
    health: number
}

export interface BattleContext {
    player: Character
    enemy: Character
    // playerHealth: number;
    // enemyHealth: number;
}

export const battleMachine = setup({
    types: {
        input: {} as BattleContext,
        context: {} as BattleContext,
        events: {} as 
            | { type: "BEGIN" }
            | { type: "ATTACK" }
            | { type: "CONFIRM"}
    },
    guards: {
        isPlayerDead: ({context}) => context.player.health <= 0,
        isEnemyDead: ({context}) => context.enemy.health <= 0
    }
}).createMachine({
    context: ({input}) => ({
        player: input.player,
        enemy: input.enemy
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
                        enemy: (event) => {
                            const enemy = event.context.enemy
                            return {...enemy, health: enemy.health - 10}
                        }
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
                        player: (event) => {
                            const player = event.context.player
                            return {...player, health: player.health -10}
                        }
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

