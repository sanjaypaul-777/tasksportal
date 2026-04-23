/**
 * Floating social-proof toasts (bottom-left). Uses siteConfig.payoutToasts.
 */
export function mountPayoutNotifications(config) {
  const pt = config?.payoutToasts;
  if (!pt?.names?.length) return () => {};

  const { names, amounts, methods, firstDelayMs, intervalMs, visibleMs, fadeMs } = pt;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes tp-slideUp { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes tp-fadeOut { from { opacity: 1; } to { opacity: 0; } }
  `;
  document.head.appendChild(style);

  function showNotification() {
    const name = names[Math.floor(Math.random() * names.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];

    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed; bottom: 20px; left: 20px;
      background: #1a1f2e; color: white; padding: 15px 25px;
      border-radius: 12px; border-left: 4px solid #00f2ff;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 1000;
      font-family: 'Inter', system-ui, sans-serif; font-size: 14px;
      animation: tp-slideUp 0.5s ease-out;
      max-width: min(360px, calc(100vw - 40px));
    `;
    toast.innerHTML = `<strong>${name}</strong> just withdrew <strong>${amount}</strong> via ${method}`;
    document.body.appendChild(toast);

    window.setTimeout(() => {
      toast.style.animation = `tp-fadeOut ${fadeMs}ms ease-in`;
      window.setTimeout(() => toast.remove(), fadeMs);
    }, visibleMs);
  }

  const t1 = window.setTimeout(() => {
    showNotification();
  }, firstDelayMs);

  const id = window.setInterval(showNotification, intervalMs);

  return () => {
    window.clearTimeout(t1);
    window.clearInterval(id);
    style.remove();
  };
}
