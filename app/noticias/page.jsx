import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import NewsGalleryClient from './NewsGalleryClient';

export default async function NewsGallery({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 9;
  const category = searchParams?.category || 'all';
  const searchTerm = searchParams?.search || '';

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('noticias_articulos')
      .select('categoria')
      .order('categoria');

    if (error) {
      console.error('Error fetching categories:', error);
      return ['all'];
    }

    const uniqueCategories = ['all', ...new Set(data.map(item => item.categoria))];
    return uniqueCategories;
  };

  const fetchNews = async () => {
    let query = supabase
      .from('noticias_articulos')
      .select('*', { count: 'exact' })
      .order('fecha_publicacion', { ascending: false });

    if (category !== 'all') {
      query = query.eq('categoria', category);
    }

    if (searchTerm) {
      query = query.ilike('titulo', `%${searchTerm}%`);
    }

    const { data, error, count } = await query
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      console.error('Error fetching news:', error);
      return { news: [], totalCount: 0 };
    }

    return { news: data, totalCount: count };
  };

  const [categories, { news, totalCount }] = await Promise.all([
    fetchCategories(),
    fetchNews()
  ]);

  return (
    <NewsGalleryClient 
      initialNews={news} 
      initialCategories={categories} 
      totalCount={totalCount}
      currentPage={page}
      pageSize={pageSize}
      currentCategory={category}
      searchTerm={searchTerm}
    />
  );
}
