export const StatusPanel = ({name, health}: {name: string, health: number}) => {
    return (
        <div>
            Name: {name}
            Health: {health}
        </div>
    )
}