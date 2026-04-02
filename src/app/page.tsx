import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import ShortsFeed from '@/components/ShortsFeed';
import { createClient } from '@supabase/supabase-js';
import { getProducts } from '@/lib/api/products';

// Initialize Supabase fallback logic safely for Server Components
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function Home() {
  const allProducts = await getProducts();
  const activeProducts = allProducts.filter(p => p.is_active);

  // Calculate discount rates on the fly to match frontend props
  const calculateDiscount = (price: number, original: number) => {
    if (original > price) return Math.round(((original - price) / original) * 100);
    return 0;
  };

  const formattedProducts = activeProducts.map(p => ({
    id: p.id,
    name: p.name,
    summary: p.summary,
    price: p.price,
    originalPrice: p.originalPrice,
    discountRate: calculateDiscount(p.price, p.originalPrice),
    imageUrl: p.imageUrl
  }));

  // Placeholder Default Shorts - Influencer Cosmetic & Skincare Reviews
  const verifiedIds = [
    "ho0EhuO3RNs", 
    "lD1VId0ec2s", 
    "mkBTUDxMKtU", 
    "yPRcriD4FcM"
  ];
  
  const dummyShorts = Array.from({ length: 10 }).map((_, i) => 
    `https://www.youtube.com/embed/${verifiedIds[i % verifiedIds.length]}`
  );

  let liveShorts: string[] = [];

  try {
    if (supabase) {
       // Attempt to fetch live from Supabase
       const { data, error } = await supabase.from('shorts').select('youtube_id').order('created_at', { ascending: false }).limit(10);
       if (!error && data && data.length > 0) {
         liveShorts = data.map(d => `https://www.youtube.com/embed/${d.youtube_id}`);
       }
    }
  } catch (e) {
    console.warn("Supabase integration failed or networking error. Falling back to mock data.", e);
  }

  // Fallback cleanly to mock data to protect Vercel rendering if database disconnects
  const finalShorts = liveShorts.length > 0 ? liveShorts : dummyShorts;

  return (
    <div className="animate-in fade-in duration-1000">
      <HeroSlider />
      
      {/* Main product listings matching the aesthetic */}
      <ProductGrid 
        title="WEEKLY BEST" 
        products={formattedProducts} 
      />

      <ProductGrid 
        title="NEW ARRIVALS" 
        products={[...formattedProducts].reverse().map(p => ({...p, id: p.id + '_new', name: 'NEW ' + p.name}))} 
      />

      <ShortsFeed shorts={finalShorts} />
    </div>
  );
}
