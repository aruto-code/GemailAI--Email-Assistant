console.log("Email Writer Extension, Content Script Loaded");

const ICON_STAR = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.09 8.26L20.72 9.27L16.36 13.97L17.45 21L12 17.77L6.55 21L7.64 13.97L3.28 9.27L9.91 8.26L12 2Z"/>
  </svg>`;

const ICON_SPINNER = `
  <svg class="btn-spinner" width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.5">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>`;

function createAIButton() {
  const button = document.createElement('div');
  button.setAttribute('role', 'button');
  button.setAttribute('data-tooltip', 'Generate AI Reply');
  button.innerHTML = `${ICON_STAR}<span>AI Reply</span>`;
  return button;
}

function setButtonLoading(button) {
  button.classList.add('loading');
  button.innerHTML = `${ICON_SPINNER}<span>Generating…</span>`;
}

function setButtonReady(button) {
  button.classList.remove('loading');
  button.innerHTML = `${ICON_STAR}<span>AI Reply</span>`;
}

function getEmailContent() {
  const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) return content.innerText.trim();
    return '';
  }
}

function findComposeToolbar() {
  const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) return toolbar;
    return null;
  }
}

function injectButton() {
  const existingButton = document.querySelector('.ai-reply-button');
  if (existingButton) existingButton.remove();

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }

  console.log("Toolbar found, creating AI button");
  const button = createAIButton();
  button.classList.add('ai-reply-button');

  button.addEventListener('click', async () => {
    try {
      setButtonLoading(button);

      const emailContent = getEmailContent();
      const response = await fetch('http://localhost:8080/api/email/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailContent, tone: "professional" })
      });

      if (!response.ok) throw new Error('API Request Failed');

      const generatedReply = await response.text();
      const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

      if (composeBox) {
        composeBox.focus();
        document.execCommand('insertText', false, generatedReply);
      } else {
        console.error('Compose box was not found');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate reply');
    } finally {
      setButtonReady(button);
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(node =>
      node.nodeType === Node.ELEMENT_NODE &&
      (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
    );
    if (hasComposeElements) {
      console.log("Compose Window Detected");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });