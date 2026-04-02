import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import ShortsFeed from '@/components/ShortsFeed';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase fallback logic safely for Server Components
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function Home() {
  const dummyProducts = [
    {
      id: "1",
      name: "레티놀 바운스 세럼",
      summary: "끈적임없이 촉촉한 기능성 세럼",
      price: 23400,
      originalPrice: 26000,
      discountRate: 10,
      imageUrl: "https://plus.unsplash.com/premium_photo-1681996500858-ff9cc3f28203?w=500&q=80&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "EGF 글로우 젤리 세럼",
      summary: "탱글한 젤리로 피부 탄성 회복 케어",
      price: 23400,
      originalPrice: 26000,
      discountRate: 10,
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "액티브 리커버리 크림",
      summary: "트러블 부터 자극 진정까지 하나로!",
      price: 23400,
      originalPrice: 26000,
      discountRate: 10,
      imageUrl: "https://plus.unsplash.com/premium_photo-1675842663249-a8b70126afbc?w=500&q=80&auto=format&fit=crop"
    },
    {
      id: "4",
      name: "퓨어 클렌징 오일",
      summary: "블랙헤드를 녹이는 클렌징 오일",
      price: 26000,
      originalPrice: 38000,
      discountRate: 0,
      imageUrl: "https://images.unsplash.com/photo-1608248593842-b062b0afdf93?w=500&q=80&auto=format&fit=crop"
    }
  ];

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
        products={dummyProducts} 
      />

      <ProductGrid 
        title="NEW ARRIVALS" 
        products={[...dummyProducts].reverse().map(p => ({...p, id: p.id + '_new', name: 'NEW ' + p.name}))} 
      />

      <ShortsFeed shorts={finalShorts} />
    </div>
  );
}
