export default function PromoBanner() {
  return (
    <div className="bg-neutral-900 border-b border-neutral-800 text-white text-[12px] font-medium tracking-wide py-2 px-4 text-center cursor-pointer hover:bg-black transition-colors z-50 flex items-center justify-center space-x-2">
      <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">N</span>
      <span>지금 가입하고 첫구매 혜택 받아가세요!</span>
    </div>
  );
}
