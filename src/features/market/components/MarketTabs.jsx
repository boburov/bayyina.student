// Components
import Tabs from "@/shared/components/ui/Tabs";

// Data
import { marketTabs } from "@/features/market/data/market.data";

/**
 * Market tabs navigation component.
 * @returns {JSX.Element} Market tabs.
 */
const MarketTabs = () => {
  return (
    <Tabs
      items={marketTabs}
      activePathIndex={1}
      listClassName="w-full"
      getItemHref={(item) => item.path}
    />
  );
};

export default MarketTabs;
