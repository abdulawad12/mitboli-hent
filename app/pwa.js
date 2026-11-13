/* Web-appen (til iPhone og andre uden APK'en): det, som den native app ellers klarer.
   Offline-brug, telefonens tilbage-knap (Android), statuslinjens farve og en lille vibration. */
(function () {
  'use strict';
  if (window.ReactNativeWebView) return;

  // Appen gemmes på telefonen, så den åbner hurtigt og også virker uden net.
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { /* virker også uden */ }); });
  }

  // Beskeder fra app-tilstanden (som den native app ellers modtager).
  var theme = document.querySelector('meta[name="theme-color"]');
  window.__appWeb = function (o) {
    if (o.type === 'chrome' && theme && o.top) theme.setAttribute('content', o.top);
    if (o.type === 'haptic' && o.kind === 'success' && navigator.vibrate) { try { navigator.vibrate(25); } catch (e) { /* ignorer */ } }
  };

  // Tilbage-knappen lukker først ark, detaljer og undersider. Øverst i appen forlader den appen som normalt.
  function guard() { if (!(history.state && history.state.apGuard)) history.pushState({ apGuard: 1 }, '', location.href); }
  addEventListener('popstate', function (e) {
    if (e.state && e.state.apGuard) return; // tilbage til en tidligere side: appen viser den selv
    if (window.__appBack && window.__appBack() !== false) guard();
  });
  addEventListener('hashchange', function () { setTimeout(guard, 0); });
  if (document.readyState === 'complete') guard(); else addEventListener('load', guard);
})();
