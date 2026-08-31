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
});
