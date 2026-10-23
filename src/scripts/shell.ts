export function initShell(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-contact-dialog]');
  const menu = document.querySelector<HTMLDetailsElement>('[data-mobile-menu]');
  const menuTrigger = menu?.querySelector<HTMLElement>('summary');
  let returnFocus: HTMLElement | null = null;

  const closeMenu = (restore = false) => {
    if (menu) menu.open = false;
    if (restore) menuTrigger?.focus();
  };

  menu?.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) closeMenu();
  });

  menu?.addEventListener('toggle', () => {
    const label = menu.open ? menu.dataset.closeLabel : menu.dataset.openLabel;
    if (label) menuTrigger?.setAttribute('aria-label', label);
  });

  document.querySelectorAll<HTMLAnchorElement>('.language-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      link.hash = window.location.hash;
      if (link.lang === 'en' || link.lang === 'pl') {
        try {
          document.cookie =
            'mumro_lang=' +
            link.lang +
            '; Path=/; Max-Age=31536000; SameSite=Lax' +
            (location.protocol === 'https:' ? '; Secure' : '');
        } catch {}
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.open && !dialog?.open) closeMenu(true);
  });

  document.addEventListener('click', (event) => {
    if (menu?.open && !menu.contains(event.target as Node)) closeMenu();
  });

  const desktop = window.matchMedia('(min-width: 861px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  // Interactive loop stage switcher on homepage
  const stageButtons = document.querySelectorAll<HTMLButtonElement>('[data-stage-trigger]');
  const stagePanels = document.querySelectorAll<HTMLElement>('[data-stage-panel]');
  if (stageButtons.length && stagePanels.length) {
    stageButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.stageTrigger;
        stageButtons.forEach((b) => {
          const active = b.dataset.stageTrigger === target;
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
          b.classList.toggle('is-active', active);
        });
        stagePanels.forEach((panel) => {
          panel.hidden = panel.dataset.stagePanel !== target;
        });
      });
    });
  }

  // Interactive curriculum filter & search on homepage
  const trackFilters = document.querySelectorAll<HTMLButtonElement>('[data-track-filter]');
  const searchInput = document.querySelector<HTMLInputElement>('[data-lesson-search]');
  const lessonCards = document.querySelectorAll<HTMLElement>('[data-lesson-card]');
  const emptyState = document.querySelector<HTMLElement>('[data-lessons-empty]');
  const resetBtn = document.querySelector<HTMLButtonElement>('[data-lessons-reset]');

  let activeTrack = 'all';
  let searchQuery = '';

  const applyLessonFilter = () => {
    if (!lessonCards.length) return;
    let visibleCount = 0;
    const normalized = searchQuery.trim().toLowerCase();
    lessonCards.forEach((card) => {
      const cardTrack = card.dataset.lessonTrack || '';
      const cardText = (card.dataset.lessonSearchText || card.textContent || '').toLowerCase();
      const matchesTrack = activeTrack === 'all' || cardTrack === activeTrack;
      const matchesQuery = !normalized || cardText.includes(normalized);
      const show = matchesTrack && matchesQuery;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });
    if (emptyState) emptyState.hidden = visibleCount > 0;
  };

  trackFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTrack = btn.dataset.trackFilter || 'all';
      trackFilters.forEach((b) => {
        const isCurrent = (b.dataset.trackFilter || 'all') === activeTrack;
        b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
        b.classList.toggle('is-active', isCurrent);
      });
      applyLessonFilter();
    });
  });

  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value;
    applyLessonFilter();
  });

  resetBtn?.addEventListener('click', () => {
    activeTrack = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    trackFilters.forEach((b) => {
      const isCurrent = (b.dataset.trackFilter || 'all') === 'all';
      b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      b.classList.toggle('is-active', isCurrent);
    });
    applyLessonFilter();
  });

  // Copy-to-clipboard for playbooks and lesson code blocks
  document.querySelectorAll<HTMLButtonElement>('[data-copy-trigger]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.copyTrigger;
      const codeEl = targetId ? document.getElementById(targetId) : null;
      const text = codeEl?.textContent || '';
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.dataset.copyLabel || btn.textContent || '';
        const copied = btn.dataset.copiedLabel || 'Copied ✓';
        btn.textContent = copied;
        setTimeout(() => {
          btn.textContent = original;
        }, 2000);
      } catch {}
    });
  });

  // Interactive self-audit checklist counter on lesson pages
  const checklistRoot = document.querySelector<HTMLElement>('[data-checklist-root]');
  if (checklistRoot) {
    const checkboxes = checklistRoot.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    const counterEl = checklistRoot.querySelector<HTMLElement>('[data-checklist-score]');
    const updateScore = () => {
      if (!counterEl) return;
      const checked = [...checkboxes].filter((cb) => cb.checked).length;
      counterEl.textContent = `${checked} / ${checkboxes.length}`;
    };
    checkboxes.forEach((cb) => cb.addEventListener('change', updateScore));
  }

  // Interactive LessonLab controllers (Voice layers, 5-Slide Carousel, Cohort windows, MCP steps)
  const voiceButtons = document.querySelectorAll<HTMLButtonElement>('[data-voice-layer]');
  if (voiceButtons.length) {
    voiceButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.voiceLayer || 'all';
        voiceButtons.forEach((b) => {
          const active = b.dataset.voiceLayer === layer;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        document.querySelectorAll<HTMLElement>('[data-layer-item]').forEach((p) => {
          p.classList.toggle('is-highlighted', layer !== 'all' && p.dataset.layerItem === layer);
        });
        document.querySelectorAll<HTMLElement>('[data-explain]').forEach((exp) => {
          exp.hidden = exp.dataset.explain !== layer;
        });
      });
    });
  }

  const bindTabGroup = (triggerAttr: string, panelAttr: string) => {
    const triggers = document.querySelectorAll<HTMLButtonElement>(`[${triggerAttr}]`);
    const panels = document.querySelectorAll<HTMLElement>(`[${panelAttr}]`);
    if (!triggers.length || !panels.length) return;
    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute(triggerAttr);
        triggers.forEach((b) => {
          const active = b.getAttribute(triggerAttr) === val;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        panels.forEach((p) => {
          p.hidden = p.getAttribute(panelAttr) !== val;
        });
      });
    });
  };

  bindTabGroup('data-slide-trigger', 'data-slide-panel');
  bindTabGroup('data-cohort-trigger', 'data-cohort-panel');
  bindTabGroup('data-mcp-step', 'data-mcp-panel');
  bindTabGroup('data-harness-mode', 'data-harness-panel');
  bindTabGroup('data-anatomy-trigger', 'data-anatomy-panel');
  bindTabGroup('data-surface-mode', 'data-surface-panel');
  bindTabGroup('data-stack-trigger', 'data-stack-panel');
  bindTabGroup('data-git-mode', 'data-git-panel');
  bindTabGroup('data-git-recovery-trigger', 'data-git-recovery-panel');

  // Contact dialog modal handling
  if (!dialog || typeof dialog.showModal !== 'function') return;
  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element).closest<HTMLElement>('[data-open-contact]');
    if (!trigger || event.defaultPrevented) return;
    if (
      event instanceof MouseEvent &&
      (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
    )
      return;
    event.preventDefault();
    returnFocus = menu?.contains(trigger) ? menuTrigger ?? trigger : trigger;
    closeMenu();
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
    dialog.querySelector<HTMLElement>('[data-close-contact]')?.focus();
  });

  dialog.querySelector('[data-close-contact]')?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [
      ...dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]'),
    ].filter((el) => el.getClientRects().length);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  let startedOutside = false;
  const outsideDialog = (x: number, y: number) => {
    const box = dialog.getBoundingClientRect();
    return x < box.left || x > box.right || y < box.top || y > box.bottom;
  };
  dialog.addEventListener('pointerdown', (event) => {
    startedOutside = event.target === dialog && outsideDialog(event.clientX, event.clientY);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    if (startedOutside && outsideDialog(event.clientX, event.clientY)) dialog.close();
    startedOutside = false;
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    returnFocus?.focus({ preventScroll: true });
  });
}
