'use client';

import { Plus, Trash2, Pencil, X, Eye, EyeOff, Menu as MenuIcon } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/api/products';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

/* ── Types ─────────────────────────────────────────────────────────── */
interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  is_published: boolean;
  show_in_nav: boolean;
  nav_order: number;
  created_at: string;
}

/* ── TipTap Editor Wrapper ─────────────────────────────────────────── */
function RichEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-100 bg-gray-50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2.5 py-1.5 text-xs font-bold rounded transition-colors ${editor.isActive('bold') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2.5 py-1.5 text-xs italic rounded transition-colors ${editor.isActive('italic') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2.5 py-1.5 text-xs line-through rounded transition-colors ${editor.isActive('strike') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>S</button>
        <div className="w-px bg-gray-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2.5 py-1.5 text-xs font-bold rounded transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2.5 py-1.5 text-xs font-bold rounded transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>H3</button>
        <div className="w-px bg-gray-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2.5 py-1.5 text-xs rounded transition-colors ${editor.isActive('bulletList') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>&#8226; List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2.5 py-1.5 text-xs rounded transition-colors ${editor.isActive('orderedList') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>1. List</button>
        <div className="w-px bg-gray-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2.5 py-1.5 text-xs rounded transition-colors ${editor.isActive('blockquote') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>&#8220; Quote</button>
        <button type="button" onClick={() => {
          const url = window.prompt('이미지 URL을 입력하세요:');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }} className="px-2.5 py-1.5 text-xs rounded hover:bg-gray-200 transition-colors">Image</button>
        <button type="button" onClick={() => {
          const url = window.prompt('링크 URL을 입력하세요:');
          if (url) editor.chain().focus().setLink({ href: url }).run();
          else editor.chain().focus().unsetLink().run();
        }} className={`px-2.5 py-1.5 text-xs rounded transition-colors ${editor.isActive('link') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>Link</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────── */
export default function PagesAdminPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    is_published: false,
    show_in_nav: false,
    nav_order: 0,
  });

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!supabase) throw new Error('No client');
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('nav_order', { ascending: true });
      if (error) throw error;
      setPages(data ?? []);
    } catch {
      console.warn('페이지 목록 로딩 실패');
      setPages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', slug: '', content: '', is_published: false, show_in_nav: false, nav_order: 0 });
    setIsSubmitting(false);
  };

  const openEdit = (page: Page) => {
    setEditingId(page.id);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      is_published: page.is_published,
      show_in_nav: page.show_in_nav,
      nav_order: page.nav_order,
    });
    setIsModalOpen(true);
  };

  const autoSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!supabase) throw new Error('No client');

      const payload = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        is_published: formData.is_published,
        show_in_nav: formData.show_in_nav,
        nav_order: formData.nav_order,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error } = await supabase.from('pages').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pages').insert([payload]);
        if (error) throw error;
      }

      await fetchAll();
      resetModal();
    } catch (err) {
      console.error('페이지 저장 실패:', err);
      alert('페이지 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 페이지를 삭제하시겠습니까?')) return;
    try {
      if (!supabase) throw new Error('No client');
      await supabase.from('pages').delete().eq('id', id);
      setPages(prev => prev.filter(p => p.id !== id));
    } catch {
      console.warn('삭제 실패');
    }
  };

  const togglePublish = async (page: Page) => {
    try {
      if (!supabase) throw new Error('No client');
      await supabase.from('pages').update({ is_published: !page.is_published }).eq('id', page.id);
      setPages(prev => prev.map(p => p.id === page.id ? { ...p, is_published: !p.is_published } : p));
    } catch {
      console.warn('상태 변경 실패');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-800">페이지 관리</h2>
          <p className="text-sm text-gray-500 mt-1">메뉴에 표시할 페이지를 추가하고 관리하세요</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#111111] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> 새 페이지
        </button>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-400 font-bold tracking-widest">불러오는 중...</div>
        ) : pages.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-sm font-semibold">등록된 페이지가 없습니다</p>
            <p className="text-xs mt-1">새 페이지 버튼을 눌러 이벤트, 브랜드 스토리 등의 페이지를 만드세요</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4 pl-6">제목</th>
                <th className="p-4">경로 (slug)</th>
                <th className="p-4">메뉴 표시</th>
                <th className="p-4">순서</th>
                <th className="p-4">상태</th>
                <th className="p-4 pr-6 text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6 font-bold text-gray-900 text-sm">{page.title}</td>
                  <td className="p-4 text-gray-500 text-xs font-mono">/pages/{page.slug}</td>
                  <td className="p-4">
                    {page.show_in_nav ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">
                        <MenuIcon className="w-3 h-3" /> 메뉴
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-300">숨김</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{page.nav_order}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(page)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors ${
                        page.is_published ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                      }`}
                    >
                      {page.is_published ? <><Eye className="w-3 h-3" /> 게시중</> : <><EyeOff className="w-3 h-3" /> 임시저장</>}
                    </button>
                  </td>
                  <td className="p-4 pr-6 text-right flex gap-1.5 justify-end">
                    <button onClick={() => openEdit(page)} className="text-gray-400 hover:text-blue-600 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(page.id)} className="text-gray-400 hover:text-red-600 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modal ───────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">{editingId ? '페이지 수정' : '새 페이지'}</h3>
              <button onClick={resetModal} className="text-gray-400 hover:text-black transition-colors p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
              {/* Title + Slug */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">페이지 제목 *</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => {
                      const title = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        title,
                        slug: editingId ? prev.slug : autoSlug(title),
                      }));
                    }}
                    className="w-full border border-gray-200 p-2.5 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none"
                    placeholder="예: 이벤트 & 공지사항"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">URL 경로 (slug) *</label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">/pages/</span>
                    <input
                      required
                      type="text"
                      value={formData.slug}
                      onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                      className="flex-1 border border-gray-200 p-2.5 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none font-mono"
                      placeholder="events"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={e => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="w-4 h-4 rounded accent-black"
                  />
                  <span className="text-sm font-medium text-gray-700">게시 (공개)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.show_in_nav}
                    onChange={e => setFormData(prev => ({ ...prev, show_in_nav: e.target.checked }))}
                    className="w-4 h-4 rounded accent-black"
                  />
                  <span className="text-sm font-medium text-gray-700">헤더 메뉴에 표시</span>
                </label>
                {formData.show_in_nav && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">메뉴 순서:</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.nav_order}
                      onChange={e => setFormData(prev => ({ ...prev, nav_order: Number(e.target.value) }))}
                      className="w-16 border border-gray-200 p-1.5 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none text-center"
                    />
                  </div>
                )}
              </div>

              {/* Rich Editor */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">페이지 내용</label>
                <RichEditor
                  content={formData.content}
                  onChange={html => setFormData(prev => ({ ...prev, content: html }))}
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={resetModal}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded text-sm font-semibold hover:bg-gray-50 transition-colors">
                  취소
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="bg-[#111111] text-white px-8 py-2.5 rounded text-sm font-bold tracking-widest hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> 저장 중...</>
                  ) : editingId ? '수정 저장' : '페이지 저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
