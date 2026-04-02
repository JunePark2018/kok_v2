import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-16 text-[#333]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-12 space-y-12 lg:space-y-0">
          
          {/* Company Info */}
          <div className="flex-1 max-w-sm">
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6">PURE BLANC</h2>
            <div className="space-y-2 text-[13px] text-neutral-500 leading-relaxed break-keep">
              <p>상호: 퓨어블랑</p>
              <p>대표: 관리자 | 전화: 1688-9407</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고번호: 제 2026-서울강남-1234 호</p>
              <p className="mt-4 pt-4 border-t border-neutral-100">
                © PURE BLANC All Rights Reserved.
              </p>
            </div>
            <div className="flex space-x-4 mt-6 text-[12px] font-semibold flex-wrap gap-y-2">
              <Link href="/about" className="hover:underline">회사소개</Link>
              <Link href="/terms" className="hover:underline">이용약관</Link>
              <Link href="/privacy" className="hover:underline text-black font-bold">개인정보처리방침</Link>
            </div>
          </div>

          {/* Customer Center */}
          <div className="flex-1 lg:pl-12">
            <h3 className="text-[13px] font-bold tracking-widest mb-6">CUSTOMER CENTER</h3>
            <div className="text-3xl font-extrabold tracking-tighter mb-4 text-[#111]">1688-9407</div>
            <div className="text-[13px] text-neutral-500 space-y-1">
              <p>평일 10:00 - 17:00</p>
              <p>점심 12:00 - 13:00</p>
              <p>주말 및 공휴일 휴무</p>
            </div>
          </div>

          {/* Bank Info */}
          <div className="flex-1 lg:pl-12">
            <h3 className="text-[13px] font-bold tracking-widest mb-6">BANK INFO</h3>
            <div className="text-[13px] text-neutral-500 space-y-1">
              <p>국민은행 123456-78-901234</p>
              <p className="mt-4">예금주: 퓨어블랑</p>
            </div>
            <div className="flex items-center space-x-3 mt-8">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors">
                <span className="text-[10px] font-bold text-neutral-600">IG</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors">
                <span className="text-[10px] font-bold text-neutral-600">YT</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
