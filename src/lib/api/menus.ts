import { supabase } from './products';

export interface Menu {
  id: string;
  parent_id: string | null;
  slug: string;
  title: Record<string, string>;
  page_type: 'page' | 'board';
  content: Record<string, string>;
  board_write_role: 'admin' | 'user';
  show_in_nav: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface MenuWithChildren extends Menu {
  children: Menu[];
}

export interface Post {
  id: string;
  menu_id: string;
  title: string;
  content: string;
  author_name: string;
  is_admin_post: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getMenuTree(): Promise<MenuWithChildren[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error || !data) return [];

  const parents = data.filter((m: Menu) => !m.parent_id);
  return parents.map((p: Menu) => ({
    ...p,
    children: data.filter((c: Menu) => c.parent_id === p.id),
  }));
}

export async function getAllMenus(): Promise<Menu[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error || !data) return [];
  return data;
}

export async function getMenuBySlug(slug: string): Promise<Menu | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error || !data) return null;
  return data;
}

export async function getPostsByMenu(menuId: string): Promise<Post[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('menu_id', menuId)
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
}

export async function getPostById(postId: string): Promise<Post | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();
  if (error || !data) return null;
  return data;
}
