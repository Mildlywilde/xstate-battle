import { Character } from "../types"

export const StatusPanel = ({character}: {character: Character}) => {
    return (
        <div>
            <p>Name: {character.name}</p>
            <p>Health: {character.health}</p>
        </div>
    )
}