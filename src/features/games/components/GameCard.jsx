// Router
import { Link } from "react-router-dom";

/**
 * Renders a single game card item.
 * @param {object} props Component props.
 * @param {object} props.game game object.
 * @returns {JSX.Element} game card component.
 */
const GameCard = ({ game }) => {
  return (
    <Link to={`/games/${game.id}`} className="block">
      {/* Image */}
      <img
        width={264}
        height={264}
        alt={game.name}
        src={game?.image}
        className="w-full h-auto bg-white aspect-square rounded-2xl object-cover"
      />

      {/* Game Details */}
      <div className="p-1.5 space-y-1.5">
        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold text-primary xs:text-base">
          {game.name}
        </h3>

        {/* Description */}
        <p className="text-xs xs:text-sm text-gray-600">{game.description}</p>
      </div>
    </Link>
  );
};

export default GameCard;
