export interface Character {
    name: string
    health: number
}

export interface BattleContext {
    player: Character
    enemy: Character
}