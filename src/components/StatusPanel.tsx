import { Character } from "../xstate/battleMachine"

export const StatusPanel = ({character}: {character: Character}) => {
    return (
        <div>
            Name: {character.name}
            Health: {character.health}
        </div>
    )
}