// Icons
import { Bug } from "lucide-react";

// Utils
import { cn } from "@/shared/utils/cn";

// Router
import { useParams } from "react-router-dom";

// Data
import { getGameById } from "../data/games.data";

// Hooks
import useObjectState from "@/shared/hooks/useObjectState";

// Animations
import { gamepadAnimation } from "@/shared/assets/animations";

// Components
import LoaderCard from "@/shared/components/ui/LoaderCard";
import BackHeader from "@/shared/components/layout/BackHeader";

const GamePage = () => {
  const { gameId } = useParams();
  const { game, isLoading, setField } = useObjectState({
    isLoading: true,
    game: getGameById(gameId),
  });

  return (
    <div className="h-svh pb-28 bg-gray-100 animate__animated animate__fadeIn">
      {/* Back Header */}
      <BackHeader href="/games" title={game?.name || "O'yin topilmadi"} />

      {/* Game iframe */}
      <div className="relative w-full h-[calc(100svh-64px)]">
        <GameState game={game} isLoading={isLoading} />

        <iframe
          src={game?.url}
          onError={() => setField("game", null)}
          onLoad={() => setField("isLoading", false)}
          className={cn(
            "size-full transition-opacity duration-1000",
            isLoading ? "opacity-0" : "opacity-100",
          )}
        />
      </div>
    </div>
  );
};

const GameState = ({ game, isLoading }) => {
  // Error
  if (!game) {
    return (
      <div className="absolute inset-0 z-10 size-full bg-gray-100 p-4">
        <LoaderCard
          icon={Bug}
          kind="icon"
          animated={false}
          className="size-full"
          title="O'yinni sozlashda xatolik!"
        />
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="absolute inset-0 z-10 size-full bg-gray-100 p-4">
        <LoaderCard
          className="size-full"
          title="O'yin sozlanmoqda..."
          animationData={gamepadAnimation}
        />
      </div>
    );
  }
};

export default GamePage;
