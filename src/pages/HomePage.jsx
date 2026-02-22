import { useEffect, useState } from 'react';
import HeroSlider from '../components/home/HeroSlider';
import WatchShowcaseBanner from '../components/home/WatchShowcaseBanner';
import ShopByCollection from '../components/home/ShopByCollection';
import BestWatchCollections from '../components/home/BestWatchCollections';
import TrustSection from '../components/home/TrustSection';
import Newsletter from '../components/home/Newsletter';
import { fetchProducts } from '../utils/api';
import Animate from '../components/home/Animate';
import Indianew from '../components/home/Indianew';
import Sellbrandon from '../components/home/sellbrandon';
import ExploreAccessories from '../components/home/ExploreAccessories';
import Shopby from '../components/home/Shopby';
export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <main>
      <HeroSlider />
      <WatchShowcaseBanner />
      <ShopByCollection />
      <Shopby/>
      <BestWatchCollections products={products} />
      <Animate />
       <ExploreAccessories /> 
       <Sellbrandon />
       <Indianew />
      <TrustSection />
      <Newsletter />
    </main>
  );
}
