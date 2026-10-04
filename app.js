const STORAGE_KEY = "editz_app_config";
const DEFAULT_CONFIG = {
  title: "🍏ادیتز اپدیت شد🍏",
  version: "1.0.0",
  downloadUrl: "https://t.me/EditzApps",
  buttonText: "دانلود نسخه جدید",
  statusText: "Update",
  fontFamily: "'Vazirmatn', sans-serif",
  textSize: 16
};

function getConfig() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return DEFAULT_CONFIG;

  try {
    return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

function renderConfig() {
  const config = getConfig();

  const titleEl = document.getElementById("main-title");
  const versionEl = document.getElementById("app-version");
  const linkEl = document.getElementById("download-link");
  const statusEl = document.getElementById("status-text");
  const pageTitleEl = document.getElementById("page-title");

  if (titleEl) titleEl.textContent = config.title;
  if (versionEl) versionEl.textContent = config.version;
  if (linkEl) {
    linkEl.href = config.downloadUrl;
    linkEl.textContent = config.buttonText;
    linkEl.setAttribute("aria-label", config.buttonText);
  }
  if (statusEl) statusEl.textContent = config.statusText;
  if (pageTitleEl) pageTitleEl.textContent = config.title;

  document.body.style.fontFamily = config.fontFamily;
  document.body.style.fontSize = `${config.textSize}px`;
}

document.addEventListener("DOMContentLoaded", renderConfig);

fetch("./version.json")
  .then((response) => response.json())
  .then((data) => {
    const version = data.version || "1.0.0";
    const downloadUrl = data.downloadUrl || "https://t.me/EditzApps";
    const buttonText = data.buttonText || "دانلود نسخه جدید";

    document.getElementById("app-version").textContent = version;
    document.getElementById("download-link").href = downloadUrl;
    document.getElementById("download-link").textContent = buttonText;
    document.getElementById("download-link").setAttribute("aria-label", buttonText);
  })
  .catch(() => {
    document.getElementById("app-version").textContent = "1.0.0";
  });

const metaVersion = document.querySelector('meta[name="app-version"]');
const versionValue = document.getElementById("versionValue");

if (metaVersion && versionValue) {
  versionValue.textContent = metaVersion.getAttribute("content") || "2.0.0";
}
