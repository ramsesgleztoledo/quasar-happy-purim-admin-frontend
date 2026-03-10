// /**
//  * SpamAnalyzer Embeddable Widget
//  * Self-contained vanilla JS widget for spam analysis.
//  * Usage:
//  *   <div id="spam-analyzer-container"></div>
//  *   <script src="https://spamanalyzer.hpsend.com/widget/spam-analyzer.js"></script>
//  *   <script>
//  *     SpamAnalyzer.init({
//  *       apiUrl: 'https://spamanalyzer.hpsend.com/api/analyze',
//  *       apiKey: 'your-api-key',
//  *       userId: 'your-user-id',
//  *       unsubscribeUrl: 'https://example.com/unsubscribe',
//  *       subjectSelector: '#txtSubject',
//  *       bodyEditorId: 'UltimateEditor1',
//  *       containerId: 'spam-analyzer-container',
//  *       mergeFields: ['FirstName', 'LastName', 'CompanyName'],
//  *       thoroughMode: true  // optional: enables deeper analysis (default: fast mode)
//  *     });
//  *   </script>
//  */
// (function () {
//   'use strict';

//   // â”€â”€â”€ CSS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//   var CSS = [
//     '.sa-widget { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1a1a2e; line-height: 1.5; text-align: center; }',
//     '.sa-widget *, .sa-widget *::before, .sa-widget *::after { box-sizing: border-box; }',

//     /* Intro */
//     '.sa-intro { padding: 20px 16px; text-align: center; }',
//     '.sa-intro-badge { display: inline-block; background: #4f46e5; color: #fff; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 10px; margin-bottom: 10px; }',
//     '.sa-intro h3 { font-size: 1rem; margin: 0 0 8px; color: #1a1a2e; }',
//     '.sa-intro p { font-size: 0.85rem; color: #6b7280; margin: 0 0 16px; line-height: 1.5; }',

//     /* Analyze button */
//     '.sa-analyze-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 24px; background: #4f46e5; color: #fff; border: none; border-radius: 6px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }',
//     '.sa-analyze-btn:hover { background: #4338ca; }',
//     '.sa-analyze-btn:disabled { background: #9ca3af; cursor: not-allowed; }',
//     '.sa-analyze-wrap { text-align: center; margin-top: 12px; }',

//     /* Gauge */
//     '.sa-gauge { display: flex; flex-direction: column; align-items: center; padding: 12px 0 4px; }',
//     '.sa-gauge svg { max-width: 220px; }',
//     '.sa-gauge-label { font-weight: 600; text-align: center; margin-top: -4px; font-size: 0.95rem; }',

//     /* Suggestions */
//     '.sa-suggestions h3 { font-size: 0.95rem; margin: 12px 0 8px; }',
//     '.sa-suggestions ul { list-style: none; margin: 0; padding: 0; }',
//     '.sa-suggestion-item { display: flex; align-items: flex-start; gap: 8px; padding: 8px 10px; border-radius: 6px; margin-bottom: 6px; font-size: 0.88rem; text-align: left; }',
//     '.sa-severity-low { background: rgba(34,197,94,0.08); }',
//     '.sa-severity-medium { background: rgba(245,158,11,0.08); }',
//     '.sa-severity-high { background: rgba(239,68,68,0.08); }',
//     '.sa-suggestion-icon { flex-shrink: 0; }',

//     /* Suggested Revision */
//     '.sa-revision { margin-top: 16px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }',
//     '.sa-revision-header { width: 100%; display: flex; align-items: center; padding: 10px 14px; background: #f0f2f5; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 600; color: #1a1a2e; transition: background 0.15s; }',
//     '.sa-revision-header:hover { background: rgba(0,0,0,0.04); }',
//     '.sa-revision-preview { max-height: 260px; overflow-y: auto; padding: 14px; font-size: 0.9rem; line-height: 1.6; border-top: 1px solid #e0e0e0; text-align: left; }',
//     '.sa-revision-subject { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0; }',
//     '.sa-revision-body { color: #1a1a2e; }',
//     '.sa-revision-body p { margin: 6px 0; }',
//     '.sa-revision-body a { color: #4f46e5; text-decoration: underline; }',
//     '.sa-accept-btn { width: 100%; padding: 10px; background: #22c55e; color: #fff; border: none; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }',
//     '.sa-accept-btn:hover { background: #16a34a; }',

//     /* Loading */
//     '.sa-loading { padding: 32px 16px; }',
//     '.sa-loading-text { color: #6b7280; font-size: 0.9rem; margin-bottom: 14px; }',
//     '.sa-progress-track { width: 220px; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; margin: 0 auto; }',
//     '.sa-progress-bar { height: 100%; width: 40%; background: linear-gradient(90deg, #4f46e5, #818cf8); border-radius: 3px; animation: sa-slide 1.2s ease-in-out infinite; }',
//     '@keyframes sa-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }',

//     /* Fact */
//     '.sa-fact { margin-top: 18px; padding: 12px 16px; background: #f0f2f5; border-radius: 8px; font-size: 0.82rem; color: #475569; line-height: 1.5; text-align: center; transition: opacity 0.4s ease; }',
//     '.sa-fact-icon { margin-right: 4px; }',
//     '.sa-fact.sa-fade-out { opacity: 0; }',

//     /* Thorough mode notice */
//     '.sa-thorough-notice { margin-top: 12px; padding: 10px 14px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 6px; font-size: 0.82rem; color: #92400e; line-height: 1.5; text-align: center; }',
//     '.sa-thorough-notice-icon { margin-right: 4px; }',

//     /* States */
//     '.sa-error { text-align: center; padding: 12px; color: #ef4444; font-size: 0.88rem; margin-bottom: 12px; }'
//   ].join('\n');

//   function injectCSS() {
//     if (document.getElementById('sa-widget-styles')) return;
//     var style = document.createElement('style');
//     style.id = 'sa-widget-styles';
//     style.textContent = CSS;
//     document.head.appendChild(style);
//   }

//   // â”€â”€â”€ Email Facts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//   var FACTS = [
//     'About 45% of all emails sent worldwide are spam.',
//     '69% of recipients report email as spam based on the subject line alone.',
//     'Emails with personalized subject lines are 26% more likely to be opened.',
//     'The word "free" in a subject line can increase spam filter flags by up to 50%.',
//     'Including an unsubscribe link actually improves deliverability and sender reputation.',
//     'Emails sent on Tuesdays have the highest average open rates.',
//     'Using ALL CAPS in subject lines increases spam scores significantly.',
//     'The average office worker receives about 121 emails per day.',
//     'Over 20% of legitimate marketing emails never reach the inbox.',
//     'Adding a plain-text version alongside HTML improves deliverability.',
//     'Spam filters analyze the ratio of images to text \u2014 too many images is a red flag.',
//     'The CAN-SPAM Act requires a physical mailing address in commercial emails.',
//     'Email authentication (SPF, DKIM, DMARC) can improve inbox placement by 10%.',
//     'Exclamation marks in subject lines are a common spam trigger \u2014 use sparingly!',
//     'The first email was sent in 1971 by Ray Tomlinson to himself.',
//     'Emails with 6\u201310 words in the subject line have the highest open rates.',
//     'Using a reply-to address that matches your from address boosts trust signals.',
//     'Gmail alone blocks over 100 million phishing emails every day.',
//     'Segmented email campaigns can see up to 760% increase in revenue.',
//     'A clean email list can improve deliverability rates by up to 20%.'
//   ];

//   // â”€â”€â”€ SVG Gauge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//   var GAUGE_COLORS = [
//     { limit: 30, color: '#4caf50' },
//     { limit: 60, color: '#ff9800' },
//     { limit: 100, color: '#f44336' }
//   ];

//   function polarToCart(cx, cy, r, angleDeg) {
//     var rad = angleDeg * Math.PI / 180;
//     return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
//   }

//   function describeArc(cx, cy, r, startAngle, endAngle) {
//     var start = polarToCart(cx, cy, r, startAngle);
//     var end = polarToCart(cx, cy, r, endAngle);
//     var largeArc = (endAngle - startAngle > 180) ? 1 : 0;
//     return 'M ' + start.x + ' ' + start.y + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + end.x + ' ' + end.y;
//   }

//   function buildGaugeSVG(score) {
//     var width = 220, height = 130;
//     var cx = 110, cy = 115;
//     var outerR = 95, arcWidth = 20;
//     var midR = outerR - arcWidth / 2;
//     var arcStart = 180, arcEnd = 360;
//     var totalArc = arcEnd - arcStart;

//     var svgParts = [];
//     svgParts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '" width="' + width + '" height="' + height + '">');

//     var prevLimit = 0;
//     for (var i = 0; i < GAUGE_COLORS.length; i++) {
//       var seg = GAUGE_COLORS[i];
//       var segStart = arcStart + (prevLimit / 100) * totalArc;
//       var segEnd = arcStart + (seg.limit / 100) * totalArc;
//       var gapDeg = 1;
//       var adjustedStart = (i === 0) ? segStart : segStart + gapDeg;
//       var adjustedEnd = (i === GAUGE_COLORS.length - 1) ? segEnd : segEnd - gapDeg;
//       var d = describeArc(cx, cy, midR, adjustedStart, adjustedEnd);
//       svgParts.push('<path d="' + d + '" fill="none" stroke="' + seg.color + '" stroke-width="' + arcWidth + '" stroke-linecap="round"/>');
//       prevLimit = seg.limit;
//     }

//     var needleAngle = arcStart + (Math.min(Math.max(score, 0), 100) / 100) * totalArc;
//     var needleLen = midR - 8;
//     var tip = polarToCart(cx, cy, needleLen, needleAngle);
//     var baseR = 6;
//     svgParts.push('<line x1="' + cx + '" y1="' + cy + '" x2="' + tip.x + '" y2="' + tip.y + '" stroke="#333" stroke-width="3" stroke-linecap="round">');
//     svgParts.push('<animate attributeName="x2" from="' + cx + '" to="' + tip.x + '" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>');
//     svgParts.push('<animate attributeName="y2" from="' + cy + '" to="' + tip.y + '" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>');
//     svgParts.push('</line>');
//     svgParts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + baseR + '" fill="#333"/>');
//     svgParts.push('<text x="' + cx + '" y="' + (cy - 20) + '" text-anchor="middle" font-size="36" font-weight="700" fill="#333">' + score + '</text>');

//     svgParts.push('</svg>');
//     return svgParts.join('');
//   }

//   function getRiskLabel(score) {
//     if (score <= 30) return 'Low spam risk';
//     if (score <= 60) return 'Moderate spam risk';
//     return 'High spam risk';
//   }

//   function getRiskColor(score) {
//     if (score <= 30) return '#4caf50';
//     if (score <= 60) return '#ff9800';
//     return '#f44336';
//   }

//   // â”€â”€â”€ Severity icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//   var SEVERITY_ICONS = {
//     low: '\u2139\uFE0F',
//     medium: '\u26A0\uFE0F',
//     high: '\u274C'
//   };

//   // â”€â”€â”€ Widget class â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//   function Widget(config) {
//     this.apiUrl = config.apiUrl;
//     this.apiKey = config.apiKey || '';
//     this.userId = config.userId || '';
//     this.unsubscribeUrl = config.unsubscribeUrl || '';
//     this.subjectSelector = config.subjectSelector;
//     this.bodyEditorId = config.bodyEditorId;
//     this.containerId = config.containerId;
//     this.mergeFields = config.mergeFields || [];
//     this.thoroughMode = !!config.thoroughMode;

//     this._requestId = 0;
//     this._revisionExpanded = true;
//     this._factTimer = null;
//     this._factIndex = Math.floor(Math.random() * FACTS.length);

//     // State
//     this._score = null;
//     this._suggestions = [];
//     this._revisedSubject = null;
//     this._revisedHtmlBody = null;
//     this._loading = false;
//     this._error = null;
//     this._hasResults = false;
//   }

//   Widget.prototype.start = function () {
//     injectCSS();
//     this._container = document.getElementById(this.containerId);
//     if (!this._container) {
//       console.error('[SpamAnalyzer] Container #' + this.containerId + ' not found');
//       return;
//     }
//     this._container.classList.add('sa-widget');
//     this._renderIntro();
//   };

//   Widget.prototype._readSubject = function () {
//     var el = document.querySelector(this.subjectSelector);
//     return el ? (el.value || '') : '';
//   };

//   Widget.prototype._readBody = function () {
//     try {
//       if (typeof UltimateEditors !== 'undefined' && UltimateEditors[this.bodyEditorId]) {
//         return UltimateEditors[this.bodyEditorId].GetEditorHTML() || '';
//       }
//     } catch (e) { /* editor not ready yet */ }
//     return '';
//   };

//   Widget.prototype._startFactRotation = function () {
//     this._stopFactRotation();
//     var self = this;
//     this._factTimer = setInterval(function () {
//       var el = self._container.querySelector('.sa-fact');
//       if (!el) return;
//       el.classList.add('sa-fade-out');
//       setTimeout(function () {
//         self._factIndex = (self._factIndex + 1) % FACTS.length;
//         el.innerHTML = '<span class="sa-fact-icon">\uD83D\uDCA1</span> ' + escapeHtml(FACTS[self._factIndex]);
//         el.classList.remove('sa-fade-out');
//       }, 400);
//     }, 5000);
//   };

//   Widget.prototype._stopFactRotation = function () {
//     if (this._factTimer) {
//       clearInterval(this._factTimer);
//       this._factTimer = null;
//     }
//   };

//   Widget.prototype._analyze = function () {
//     var subject = this._readSubject().trim();
//     var bodyHtml = this._readBody();
//     var bodyText = bodyHtml.replace(/<[^>]*>/g, '').trim();

//     if (!subject && !bodyText) {
//       this._error = 'Please enter a subject or email body before analyzing.';
//       this._renderIntro();
//       return;
//     }

//     var currentId = ++this._requestId;
//     this._loading = true;
//     this._error = null;
//     this._renderLoading();

//     var self = this;
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', this.apiUrl, true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     if (this.apiKey) {
//       xhr.setRequestHeader('X-API-Key', this.apiKey);
//     }
//     if (this.userId) {
//       xhr.setRequestHeader('X-User-ID', this.userId);
//     }
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState !== 4) return;
//       if (currentId !== self._requestId) return;

//       self._loading = false;
//       self._stopFactRotation();
//       if (xhr.status >= 200 && xhr.status < 300) {
//         try {
//           var result = JSON.parse(xhr.responseText);
//           self._score = result.score;
//           self._suggestions = result.suggestions || [];
//           self._revisedSubject = result.revisedSubject || null;
//           self._revisedHtmlBody = result.revisedHtmlBody || null;
//           self._error = null;
//           self._hasResults = true;
//           self._renderResults();
//         } catch (e) {
//           self._error = 'Invalid response from server';
//           self._hasResults = false;
//           self._renderIntro();
//         }
//       } else {
//         try {
//           var errData = JSON.parse(xhr.responseText);
//           self._error = errData.error || ('Server error: ' + xhr.status);
//         } catch (e) {
//           self._error = 'Server error: ' + xhr.status;
//         }
//         self._hasResults = false;
//         self._renderIntro();
//       }
//     };
//     xhr.onerror = function () {
//       if (currentId !== self._requestId) return;
//       self._loading = false;
//       self._stopFactRotation();
//       self._error = 'Network error \u2014 could not reach the analysis server';
//       self._hasResults = false;
//       self._renderIntro();
//     };

//     var payload = { subject: subject, htmlBody: bodyHtml };
//     if (this.mergeFields && this.mergeFields.length > 0) {
//       payload.mergeFields = this.mergeFields;
//     }
//     if (this.unsubscribeUrl) {
//       payload.unsubscribeUrl = this.unsubscribeUrl;
//     }
//     if (this.thoroughMode) {
//       payload.thoroughMode = true;
//     }
//     xhr.send(JSON.stringify(payload));
//   };

//   // â”€â”€â”€ Rendering â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

//   Widget.prototype._renderIntro = function () {
//     var html = [];
//     html.push('<div class="sa-intro">');
//     html.push('<span class="sa-intro-badge">New Feature</span>');
//     html.push('<h3>Spam Score Analyzer</h3>');
//     html.push('<p>Check your email before sending. This tool analyzes your subject line and body for common spam triggers, gives you a deliverability score, and suggests improvements to help your emails land in the inbox.</p>');

//     if (this._error) {
//       html.push('<div class="sa-error">' + escapeHtml(this._error) + '</div>');
//     }

//     html.push('<div class="sa-analyze-wrap">');
//     html.push('<button type="button" class="sa-analyze-btn" data-sa-action="analyze">\uD83D\uDD0D Analyze Email</button>');
//     html.push('</div>');
//     html.push('</div>');

//     this._container.innerHTML = html.join('');
//     this._bindAnalyzeButton();
//   };

//   Widget.prototype._renderLoading = function () {
//     var fact = FACTS[this._factIndex];
//     var html = [];
//     html.push('<div class="sa-loading">');
//     html.push('<div class="sa-loading-text">Analyzing your email\u2026</div>');
//     html.push('<div class="sa-progress-track"><div class="sa-progress-bar"></div></div>');
//     if (this.thoroughMode) {
//       html.push('<div class="sa-thorough-notice"><span class="sa-thorough-notice-icon">\uD83D\uDD0D</span> Utilizing Thorough analysis mode \u2014 results can take up to two minutes to appear, please be patient.</div>');
//     }
//     html.push('<div class="sa-fact"><span class="sa-fact-icon">\uD83D\uDCA1</span> ' + escapeHtml(fact) + '</div>');
//     html.push('</div>');
//     this._container.innerHTML = html.join('');
//     this._startFactRotation();
//   };

//   Widget.prototype._renderResults = function () {
//     var html = [];

//     // Gauge
//     if (this._score !== null && this._score !== undefined) {
//       var riskLabel = getRiskLabel(this._score);
//       var riskColor = getRiskColor(this._score);
//       html.push('<div class="sa-gauge">');
//       html.push(buildGaugeSVG(this._score));
//       html.push('<div class="sa-gauge-label" style="color:' + riskColor + '">' + escapeHtml(riskLabel) + '</div>');
//       html.push('</div>');
//     }

//     // Suggestions
//     if (this._suggestions && this._suggestions.length > 0) {
//       html.push('<div class="sa-suggestions">');
//       html.push('<h3>Suggestions</h3>');
//       html.push('<ul>');
//       for (var i = 0; i < this._suggestions.length; i++) {
//         var s = this._suggestions[i];
//         var sev = s.severity || 'medium';
//         var icon = SEVERITY_ICONS[sev] || SEVERITY_ICONS.medium;
//         html.push('<li class="sa-suggestion-item sa-severity-' + escapeHtml(sev) + '">');
//         html.push('<span class="sa-suggestion-icon">' + icon + '</span>');
//         html.push('<span>' + escapeHtml(s.tip) + '</span>');
//         html.push('</li>');
//       }
//       html.push('</ul>');
//       html.push('</div>');
//     }

//     // Suggested Revision
//     if (this._revisedSubject || this._revisedHtmlBody) {
//       var chevron = this._revisionExpanded ? '\u25BC' : '\u25B6';
//       html.push('<div class="sa-revision">');
//       html.push('<button type="button" class="sa-revision-header" data-sa-action="toggle-revision">');
//       html.push('<span>' + chevron + ' Suggested Revision</span>');
//       html.push('</button>');
//       if (this._revisionExpanded) {
//         html.push('<div class="sa-revision-preview">');
//         if (this._revisedSubject) {
//           html.push('<div class="sa-revision-subject"><strong>Subject:</strong> ' + escapeHtml(this._revisedSubject) + '</div>');
//         }
//         if (this._revisedHtmlBody) {
//           html.push('<div class="sa-revision-body">' + this._revisedHtmlBody + '</div>');
//         }
//         html.push('</div>');
//         html.push('<button type="button" class="sa-accept-btn" data-sa-action="accept-revision">Accept Revision</button>');
//       }
//       html.push('</div>');
//     }

//     // Re-analyze button at bottom
//     html.push('<div class="sa-analyze-wrap">');
//     html.push('<button type="button" class="sa-analyze-btn" data-sa-action="analyze">\uD83D\uDD0D Re-Analyze</button>');
//     html.push('</div>');

//     this._container.innerHTML = html.join('');
//     this._bindActions();
//   };

//   Widget.prototype._bindAnalyzeButton = function () {
//     var self = this;
//     var btn = this._container.querySelector('[data-sa-action="analyze"]');
//     if (btn) {
//       btn.addEventListener('click', function () {
//         self._analyze();
//       });
//     }
//   };

//   Widget.prototype._bindActions = function () {
//     var self = this;

//     // Analyze / Re-analyze
//     this._bindAnalyzeButton();

//     // Toggle revision panel
//     var toggleBtn = this._container.querySelector('[data-sa-action="toggle-revision"]');
//     if (toggleBtn) {
//       toggleBtn.addEventListener('click', function () {
//         self._revisionExpanded = !self._revisionExpanded;
//         self._renderResults();
//       });
//     }

//     // Accept revision
//     var acceptBtn = this._container.querySelector('[data-sa-action="accept-revision"]');
//     if (acceptBtn) {
//       acceptBtn.addEventListener('click', function () {
//         self._acceptRevision();
//       });
//     }
//   };

//   Widget.prototype._acceptRevision = function () {
//     if (this._revisedSubject) {
//       var subjectEl = document.querySelector(this.subjectSelector);
//       if (subjectEl) {
//         subjectEl.value = this._revisedSubject;
//         var evt = document.createEvent('Event');
//         evt.initEvent('input', true, true);
//         subjectEl.dispatchEvent(evt);
//       }
//     }

//     if (this._revisedHtmlBody) {
//       try {
//         if (typeof UltimateEditors !== 'undefined' && UltimateEditors[this.bodyEditorId]) {
//           UltimateEditors[this.bodyEditorId].SetEditorHTML(this._revisedHtmlBody);
//         }
//       } catch (e) {
//         console.error('[SpamAnalyzer] Could not update editor:', e);
//       }
//     }
//   };

//   Widget.prototype.destroy = function () {
//     this._stopFactRotation();
//     if (this._container) this._container.innerHTML = '';
//   };

//   // â”€â”€â”€ Utility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//   function escapeHtml(str) {
//     if (!str) return '';
//     return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
//   }

//   // â”€â”€â”€ Public API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//   var instance = null;

//   window.SpamAnalyzer = {
//     init: function (config) {
//       if (instance) instance.destroy();
//       instance = new Widget(config);
//       instance.start();
//       return instance;
//     }
//   };
// })();
