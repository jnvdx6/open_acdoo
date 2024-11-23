export function truncateText(text, maxTokens = 3000) {
    const words = text.split(' ');
    return words.slice(0, maxTokens).join(' ');
  }
  
  export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }