// lib/search.ts
import { duckDuckGoSearch } from 'duckduckgo-search';

export async function duckDuckGo(query, max = 5) {
  try {
    const results = await duckDuckGoSearch(query, {
      maxResults: max,
      safeSearch: 'moderate',
      locale: 'es-es'
    });

    return results.map(result => ({
      title: result.title || '',
      link: result.link || '',
      snippet: result.description || ''
    }));
  } catch (error) {
    console.error('Error performing DuckDuckGo search:', error);
    return [];
  }
}