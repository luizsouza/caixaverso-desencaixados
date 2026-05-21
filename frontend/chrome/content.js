function buildCSS(config) {
  const rules = [];

  if (config.fontSize !== 100) {
    rules.push(`
      html { font-size: ${config.fontSize}% !important; }
      h1 { font-size: 2rem !important; }
      h2 { font-size: 1.5rem !important; }
      h3 { font-size: 1.17rem !important; }
      h4 { font-size: 1rem !important; }
      h5 { font-size: 0.83rem !important; }
      h6 { font-size: 0.67rem !important; }
      p, a, span, li, button, input, td, th { font-size: 1rem !important; }
    `);
  }

  if (config.letterSpacing > 0) {
    rules.push(`* { letter-spacing: ${config.letterSpacing}em !important; }`);
  }

  if (config.highContrast) {
    rules.push(`
      body, body * { background-color: #000 !important; color: #fff !important; border-color: #fff !important; }
      a { color: #ffff00 !important; }
    `);
  } else if (config.invertColors) {
    rules.push(`html { filter: invert(100%) hue-rotate(180deg) !important; }`);
    rules.push(`img, video, iframe { filter: invert(100%) hue-rotate(180deg) !important; }`);
  }

  if (config.focusHighlight) {
    rules.push(`*:focus { outline: 3px solid #ff0000 !important; outline-offset: 2px !important; }`);
  }

  return rules.join('\n');
}

let readingGuideEl = null;

function updateReadingGuide(enabled) {
  if (enabled) {
    if (!readingGuideEl) {
      readingGuideEl = document.createElement('div');
      readingGuideEl.id = 'accessiflow-reading-guide';
      readingGuideEl.style.cssText = `
        position: fixed;
        left: 0;
        right: 0;
        height: 4px;
        background-color: rgba(255, 0, 0, 0.5);
        pointer-events: none;
        z-index: 2147483647;
        box-shadow: 0 0 10px rgba(255,0,0,0.5);
      `;
      document.body.appendChild(readingGuideEl);
      document.addEventListener('mousemove', handleMouseMove);
    }
  } else {
    if (readingGuideEl) {
      readingGuideEl.remove();
      readingGuideEl = null;
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }
}

function handleMouseMove(e) {
  if (readingGuideEl) {
    readingGuideEl.style.top = e.clientY + 'px';
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'APPLY_CONFIG') {
    const config = message.payload;
    if (!config.enabled) {
      removeStyles();
      updateReadingGuide(false);
      return;
    }

    let styleTag = document.getElementById('accessiflow-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'accessiflow-styles';
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = buildCSS(config);
    updateReadingGuide(config.readingGuide);
  } else if (message.type === 'RESET') {
    removeStyles();
    updateReadingGuide(false);
  }
});

function removeStyles() {
  const styleTag = document.getElementById('accessiflow-styles');
  if (styleTag) styleTag.remove();
}

// Auto-load on page start
if (typeof chrome !== 'undefined' && chrome.storage) {
  chrome.storage.sync.get(['accessiflow_config'], (result) => {
    const config = result['accessiflow_config'];
    if (config && config.enabled) {
      let styleTag = document.getElementById('accessiflow-styles');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'accessiflow-styles';
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = buildCSS(config);
      updateReadingGuide(config.readingGuide);
    }
  });
}

