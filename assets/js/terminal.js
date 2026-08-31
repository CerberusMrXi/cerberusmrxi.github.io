/**
 * Interactive Terminal Component for Homepage
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-input');
  const interactiveTerminal = document.getElementById('interactive-terminal');

  if (!terminalInput || !interactiveTerminal) return;

  const commands = {
    help: 'Available commands: about, htb, tryhackme, ctf, research, articles, tools, projects, contact, clear',
    about: 'Navigating to /about/...',
    htb: 'Navigating to /htb/...',
    tryhackme: 'Navigating to /tryhackme/...',
    ctf: 'Navigating to /ctf/...',
    research: 'Navigating to /research/...',
    articles: 'Navigating to /articles/...',
    tools: 'Navigating to /tools/...',
    projects: 'Navigating to /projects/...',
    contact: 'Navigating to /contact/...',
    whoami: 'sudeepa@research-lab — Security Researcher & Software Engineer'
  };

  const routes = {
    about: '/about/',
    htb: '/htb/',
    tryhackme: '/tryhackme/',
    ctf: '/ctf/',
    research: '/research/',
    articles: '/articles/',
    tools: '/tools/',
    projects: '/projects/',
    contact: '/contact/'
  };

  let currentBuffer = '';

  document.addEventListener('keydown', (e) => {
    // Only capture if user is not in an input or textarea element
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    if (e.key === 'Enter') {
      const cmd = currentBuffer.trim().toLowerCase();
      
      if (cmd === 'clear') {
        const lines = interactiveTerminal.querySelectorAll('.terminal-line-output');
        lines.forEach(l => l.remove());
        currentBuffer = '';
        terminalInput.textContent = '';
        return;
      }

      if (cmd in commands) {
        appendOutput(`$ ${currentBuffer}`);
        appendOutput(commands[cmd], 'var(--accent)');
        if (cmd in routes) {
          setTimeout(() => {
            const basePath = window.location.pathname.replace(/\/$/, '') + '/';
            window.location.href = basePath + routes[cmd].replace(/^\//, '');
          }, 600);
        }

      } else if (cmd.length > 0) {
        appendOutput(`$ ${currentBuffer}`);
        appendOutput(`command not found: ${cmd}. Type 'help' for available commands.`, 'var(--danger)');
      }

      currentBuffer = '';
      terminalInput.textContent = '';
    } else if (e.key === 'Backspace') {
      currentBuffer = currentBuffer.slice(0, -1);
      terminalInput.textContent = currentBuffer;
    } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      currentBuffer += e.key;
      terminalInput.textContent = currentBuffer;
    }
  });

  function appendOutput(text, color = 'var(--text-secondary)') {
    const line = document.createElement('div');
    line.className = 'terminal-line terminal-line-output';
    line.style.color = color;
    line.textContent = text;
    
    // Insert before prompt line
    const promptLine = terminalInput.closest('.terminal-line');
    interactiveTerminal.insertBefore(line, promptLine);
  }
});
