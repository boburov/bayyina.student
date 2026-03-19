// Images
import memoryGameImage from "../assets/images/memory-game.jpg";
import frontendQuizGameImage from "../assets/images/html-css-js.png";

const games = [
  {
    id: "memory-game",
    name: "Xotira o'yini",
    image: memoryGameImage,
    url: "https://xotira-oyini-uz.netlify.app",
    description: "Xotira qobiliyatingizni oshiring",
  },
  {
    id: "frontend-quiz",
    name: "Frontend Quiz",
    image: frontendQuizGameImage,
    url: "https://andarov-frontquiz.netlify.app",
    description: "Frontend bilimlaringizni sinab ko'ring",
  },
];

export const getGameById = (id) => games.find((game) => game.id == id);

export default games;
