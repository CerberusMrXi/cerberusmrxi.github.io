/**
 * Lunr.js Search Client Integration
 */

document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const resultsInfo = document.getElementById('search-results-info');

  if (!searchInput || !searchResults) return;

  try {
    resultsInfo.textContent = 'Loading search index...';
    const response = await fetch('/search.json');
    if (!response.ok) throw new Error('Search index not found');
    
    const posts = await response.json();

    // Initialize Lunr index
    const idx = lunr(function () {
      this.ref('url');
      this.field('title', { boost: 10 });
      this.field('category', { boost: 5 });
      this.field('platform', { boost: 5 });
      this.field('tags', { boost: 5 });
      this.field('description', { boost: 3 });
      this.field('content');

      posts.forEach((post) => {
        this.add(post);
      });
    });

    // Map posts by URL for quick lookup
    const postMap = new Map();
    posts.forEach((post) => postMap.set(post.url, post));

    resultsInfo.textContent = `${posts.length} articles indexed. Type to search...`;

    // Search event listener
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      searchResults.innerHTML = '';

      if (query.length < 2) {
        resultsInfo.textContent = `${posts.length} articles indexed. Type to search...`;
        return;
      }

      try {
        const matches = idx.search(`*${query}*`);
        resultsInfo.textContent = `${matches.length} result(s) found for "${query}"`;

        if (matches.length === 0) {
          searchResults.innerHTML = `<p style="color: var(--text-muted);">No matching articles found.</p>`;
          return;
        }

        matches.forEach((match) => {
          const item = postMap.get(match.ref);
          if (!item) return;

          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <div class="card-header">
              <span class="badge badge-ctf">${item.platform || item.category || 'Article'}</span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">${item.date}</span>
            </div>
            <h3 class="card-title"><a href="${item.url}">${item.title}</a></h3>
            <p class="card-description">${item.description}</p>
            <div class="card-footer">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">${item.tags}</span>
              <a href="${item.url}" class="read-more">Read Article →</a>
            </div>
          `;
          searchResults.appendChild(card);
        });
      } catch (err) {
        resultsInfo.textContent = 'Invalid search query.';
      }
    });

  } catch (err) {
    console.error('Search init failed:', err);
    resultsInfo.textContent = 'Failed to load search index.';
  }
});
