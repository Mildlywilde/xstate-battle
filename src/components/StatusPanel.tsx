import { Character } from "../types";

export const StatusPanel = ({ character }: { character: Character }) => {
  return (
    <div className="border-white border-2 p-10 m-10 rounded-xl">
      <p>Name: {character.name}</p>
      <p>Health: {character.health}</p>
    </div>
  );
};
