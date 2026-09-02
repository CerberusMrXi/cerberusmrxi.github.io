/**
 * SUDEEPA WANIGARATHNA — RESEARCH LAB CORE JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
  }

  // Add Copy Buttons to Code Blocks
  document.querySelectorAll('pre').forEach((preBlock) => {
    // Wrap pre in wrapper if not already
    let wrapper = preBlock.parentElement;
    if (!wrapper.classList.contains('highlight-wrapper')) {
      wrapper = document.createElement('div');
      wrapper.className = 'highlight-wrapper';
      preBlock.parentNode.insertBefore(wrapper, preBlock);
      wrapper.appendChild(preBlock);

      // Add Header with Copy Button
      const header = document.createElement('div');
      header.className = 'code-header';
      
      // Extract language if present
      const codeElem = preBlock.querySelector('code');
      let lang = 'code';
      if (codeElem) {
        codeElem.classList.forEach((cls) => {
          if (cls.startsWith('language-')) {
            lang = cls.replace('language-', '');
          }
        });
      }
      
      header.innerHTML = `
        <span>${lang}</span>
        <button class="copy-btn" aria-label="Copy code">COPY</button>
      `;

      wrapper.insertBefore(header, preBlock);

      // Copy logic
      const copyBtn = header.querySelector('.copy-btn');
      copyBtn.addEventListener('click', async () => {
        const textToCopy = preBlock.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          copyBtn.innerText = 'COPIED!';
          copyBtn.style.color = 'var(--accent)';
          setTimeout(() => {
            copyBtn.innerText = 'COPY';
            copyBtn.style.color = '';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      });
    }
  });

  // Table of Contents Generator for Articles
  const articleContent = document.querySelector('.article-content');
      const tocContainer = document.getElementById('article-toc');

  if (articleContent && tocContainer) {
    const headings = articleContent.querySelectorAll('h2, h3');
    if (headings.length > 0) {
      const tocList = document.createElement('ul');
      tocList.className = 'toc-list';

      headings.forEach((heading, idx) => {
        if (!heading.id) {
          heading.id = `heading-${idx}`;
        }

        const li = document.createElement('li');
        if (heading.tagName.toLowerCase() === 'h3') {
          li.style.paddingLeft = '1rem';
        }

        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;

        li.appendChild(a);
        tocList.appendChild(li);
      });

      tocContainer.appendChild(tocList);
    } else {
      const tocBox = document.querySelector('.toc-box');
      if (tocBox) tocBox.style.display = 'none';
    }
  }

  // Parse GitHub Callout Alerts in Blockquotes
  document.querySelectorAll('.article-content blockquote').forEach((bq) => {
    const html = bq.innerHTML;
    const alertTypes = [
      { type: 'note', title: 'NOTE', icon: 'ℹ️', color: 'var(--tag-ctf)' },
      { type: 'important', title: 'IMPORTANT', icon: '⚡', color: 'var(--tag-thm)' },
      { type: 'warning', title: 'WARNING', icon: '⚠️', color: 'var(--tag-article)' },
      { type: 'tip', title: 'TIP', icon: '💡', color: 'var(--accent)' },
      { type: 'caution', title: 'CAUTION', icon: '🚨', color: 'var(--tag-thm)' }
    ];

    for (const alert of alertTypes) {
      const matchRegex = new RegExp(`\\[!${alert.type}\\]`, 'i');
      if (matchRegex.test(html)) {
        bq.style.borderLeftColor = alert.color;
        bq.style.fontStyle = 'normal';
        bq.style.background = 'var(--bg-surface)';
        
        const cleanHtml = html.replace(matchRegex, '').trim();
        bq.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-weight: 700; font-size: 0.85rem; color: ${alert.color}; margin-bottom: 0.5rem;">
            <span>${alert.icon}</span>
            <span>${alert.title}</span>
          </div>
          <div>${cleanHtml}</div>
        `;
        break;
      }
    }
  });
});
