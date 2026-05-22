// Background service worker — acts as an HTTP proxy to bypass CORS
// Extension service workers are not subject to CORS restrictions.

chrome.runtime.onInstalled.addListener(() => {
  console.log('CaixaAdapta Extension Installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'HTTP_REQUEST') {
    const { url, method, headers, body } = message;

    const fetchOptions = {
      method: method || 'GET',
      headers: headers || { 'Content-Type': 'application/json' },
    };

    if (body && method !== 'GET') {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    fetch(url, fetchOptions)
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        sendResponse({ ok: res.ok, status: res.status, data });
      })
      .catch((err) => {
        sendResponse({ ok: false, status: 0, error: err.message });
      });

    // Return true to keep the message channel open for async sendResponse
    return true;
  }
});
