// Components
import Tabs from "@/shared/components/ui/Tabs";

// Data
import { statisticsTabs } from "@/features/statistics/data/statistics.data";

const StatisticsTabs = () => {
  return (
    <Tabs
      activePathIndex={1}
      listClassName="w-full"
      items={statisticsTabs}
      getItemHref={(item) => item.path}
    />
  );
};

export default StatisticsTabs;
