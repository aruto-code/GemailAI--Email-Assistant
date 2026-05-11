import { useState } from 'react';
import axios from 'axios';
import './App.css';

const TONES = ['professional', 'casual', 'friendly'];

const SpinnerIcon = () => (
  <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const ChatIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#ffc840" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
      );
    } catch (err) {
      setError('Failed to generate email reply. Please try again');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-root">
      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="page-content">

        {/* Header */}
        <header className="header">
          <div className="header-eyebrow">
            <span className="status-dot" />
            AI-Powered
          </div>
          <h1 className="header-title">
            Email Reply <span>Generator</span>
          </h1>
          <p className="header-subtitle">Paste an email. Pick a tone. Get a perfect reply.</p>
        </header>

        {/* Two Column Layout */}
        <div className="two-col">

          {/* LEFT: Input + Controls */}
          <div className="left-col">

            {/* Email Input */}
            <div className="panel panel--email">
              <div className="panel-label">Original Email</div>
              <textarea
                className="custom-textarea"
                placeholder="Paste the email you'd like to reply to..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              <div className="char-count">{emailContent.length} chars</div>
            </div>

            {/* Tone Selector */}
            <div className="panel">
              <div className="panel-label">Tone</div>
              <div className="tone-row">
                <button
                  className={`tone-chip ${tone === '' ? 'active' : ''}`}
                  onClick={() => setTone('')}
                >
                  Auto
                </button>
                {TONES.map((t) => (
                  <button
                    key={t}
                    className={`tone-chip ${tone === t ? 'active' : ''}`}
                    onClick={() => setTone(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              className="generate-btn"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
            >
              {loading
                ? <><SpinnerIcon /> Generating...</>
                : '→ Generate Reply'
              }
            </button>

            {/* Error */}
            {error && <div className="error-bar">⚠ {error}</div>}
          </div>

          {/* RIGHT: Generated Reply */}
          <div className="panel panel--reply">
            <div className="panel-label">Generated Reply</div>

            {!generatedReply && !loading && (
              <div className="empty-state">
                <div className="empty-state__icon"><ChatIcon /></div>
                <span className="empty-state__text">
                  Your generated reply<br />will appear here
                </span>
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <SpinnerIcon />
                <span className="loading-state__text">Generating...</span>
              </div>
            )}

            {generatedReply && !loading && (
              <div className="reply-content result-appear">
                <textarea
                  className="custom-textarea"
                  value={generatedReply}
                  readOnly
                  style={{ flex: 1, minHeight: 320 }}
                />
                <div className="reply-actions">
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? '✓ Copied' : '⊕ Copy to Clipboard'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;