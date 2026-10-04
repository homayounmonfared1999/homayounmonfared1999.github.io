const appConfig = {
  title: "🍏ادیتز اپدیت شد🍏",
  version: "2.0.0",
  downloadUrl: "https://t.me/EditzApps",
  buttonText: "دانلود نسخه جدید",
  statusText: "Update",
  badgeText: "Update",
  subtitle: "بررسی نسخه و آپدیت جدید",
  fontFamily: "'Vazirmatn', sans-serif",
  textSize: 16,
  titleSize: 42,
  background: "#040810",
  accent: "#7ce4ff",
  accent2: "#9cffb3"
};

function applyConfig() {
  const title = document.querySelector(".title");
  const versionValue = document.getElementById("versionValue");
  const link = document.getElementById("downloadLink");
  const badge = document.querySelector(".badge");
  const status = document.querySelector(".status");
  const meta = document.querySelector('meta[name="app-version"]');

  if (title) title.textContent = appConfig.title;
  if (versionValue) versionValue.textContent = appConfig.version;
  if (link) {
    link.href = appConfig.downloadUrl;
    link.textContent = appConfig.buttonText;
    link.setAttribute("aria-label", appConfig.buttonText);
  }
  if (badge) badge.textContent = appConfig.badgeText || appConfig.statusText || "Update";
  if (status) status.textContent = appConfig.subtitle || "بررسی نسخه و آپدیت جدید";
  if (meta) meta.setAttribute("content", appConfig.version);

  document.body.style.fontFamily = appConfig.fontFamily || "'Vazirmatn', sans-serif";
  document.body.style.fontSize = `${appConfig.textSize || 16}px`;
  document.documentElement.style.setProperty("--bg-dark", appConfig.background || "#040810");
  document.documentElement.style.setProperty("--accent", appConfig.accent || "#7ce4ff");
  document.documentElement.style.setProperty("--accent-2", appConfig.accent2 || "#9cffb3");

  const titleEl = document.querySelector(".title");
  if (titleEl) {
    titleEl.style.fontSize = `${appConfig.titleSize || 42}px`;
  }
}

document.addEventListener("DOMContentLoaded", applyConfig);
