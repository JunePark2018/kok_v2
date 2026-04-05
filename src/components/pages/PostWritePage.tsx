'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/api/products';
import { useI18n } from '@/lib/i18n/context';

interface Props {
  menuId: string;
  menuSlug: string;
  menuTitle: string;
}

export default function PostWritePage({ menuId, menuSlug, menuTitle }: Props) {
  const { lang } = useI18n();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim()) return;
    setSubmitting(true);
    try {
      if (!supabase) throw new Error('No client');
      const { error } = await supabase.from('posts').insert({
        menu_id: menuId,
        title: title.trim(),
        content: content.trim(),
        author_name: authorName.trim(),
        is_admin_post: false,
        is_published: true,
      });
      if (error) throw error;
      router.push(`/${lang}/menus/${menuSlug}`);
    } catch {
      alert(lang === 'kr' ? '게시글 등록에 실패했습니다.' : 'Failed to submit.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="flex items-center text-[11px] font-semibold text-neutral-400 mb-8 tracking-widest flex-wrap gap-y-1">
        <Link href={`/${lang}`} className="hover:text-black transition-colors">HOME</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href={`/${lang}/menus/${menuSlug}`} className="hover:text-black transition-colors">{menuTitle}</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-[#111]">{lang === 'kr' ? '글쓰기' : 'Write'}</span>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight mb-8">{lang === 'kr' ? '글쓰기' : 'Write a Post'}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{lang === 'kr' ? '작성자 *' : 'Name *'}</label>
          <input type="text" required value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder={lang === 'kr' ? '이름을 입력하세요' : 'Your name'} className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{lang === 'kr' ? '제목 *' : 'Title *'}</label>
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder={lang === 'kr' ? '제목을 입력하세요' : 'Post title'} className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{lang === 'kr' ? '내용' : 'Content'}</label>
          <textarea rows={12} value={content} onChange={e => setContent(e.target.value)} placeholder={lang === 'kr' ? '내용을 입력하세요...' : 'Write your post...'} className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none" />
        </div>
        <div className="flex gap-3 pt-4">
          <Link href={`/${lang}/menus/${menuSlug}`} className="px-6 py-3 border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors">
            {lang === 'kr' ? '취소' : 'Cancel'}
          </Link>
          <button type="submit" disabled={submitting} className="px-8 py-3 bg-[#111] text-white text-sm font-bold tracking-wider hover:bg-black transition-colors disabled:opacity-50">
            {submitting ? (lang === 'kr' ? '등록 중...' : 'Submitting...') : (lang === 'kr' ? '등록' : 'Submit')}
          </button>
        </div>
      </form>
    </div>
  );
}
