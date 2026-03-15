// Icons
import { Gamepad2, TriangleAlert } from "lucide-react";

const topNavItems = [
  {
    to: "/penalties",
    label: "Jarimalar",
    description: "Jarimalaringizni ko'rish uchun",
    icon: TriangleAlert,
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-700",
  },
  {
    to: "/games",
    label: "O'yinlar",
    description: "Aqlingizni chiniqtirish uchun",
    icon: Gamepad2,
    gradientFrom: "from-emerald-400",
    gradientTo: "to-green-700",
  },
];

export { topNavItems };
