import { supabase } from '../supabaseClient';       
import type { Post } from '../../components/PostList';

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Post[];
}

export async function addPost(post: Omit<Post, 'id'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function updatePost(id: string, post: Partial<Omit<Post, 'id'>>) {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
} 