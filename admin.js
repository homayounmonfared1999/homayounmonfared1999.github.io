const STORAGE_KEY = "editz_app_config";
const DEFAULT_CONFIG = {
  title: "🍏ادیتز اپدیت شد🍏",
  version: "2.0.0",
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

function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function setStatus(elementId, message, isError = false) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "#ff9c9c" : "#9cffb3";
}

function showEditor() {
  document.getElementById("login-box").classList.add("hidden");
  document.getElementById("editor-box").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("editor-box").classList.add("hidden");
  document.getElementById("login-box").classList.remove("hidden");
}

function populateForm() {
  const config = getConfig();
  document.getElementById("title-input").value = config.title;
  document.getElementById("version-input").value = config.version;
  document.getElementById("font-input").value = config.fontFamily;
  document.getElementById("text-size-input").value = config.textSize;
  document.getElementById("link-input").value = config.downloadUrl;
  document.getElementById("button-input").value = config.buttonText;
}

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const saveBtn = document.getElementById("save-btn");
  const resetBtn = document.getElementById("reset-btn");
  const logoutBtn = document.getElementById("logout-btn");

  const isLoggedIn = localStorage.getItem("editz_admin_logged_in") === "true";
  if (isLoggedIn) {
    populateForm();
    showEditor();
  }

  loginBtn.addEventListener("click", () => {
    const entered = passwordInput.value.trim();
    if (entered === ADMIN_PASSWORD) {
      localStorage.setItem("editz_admin_logged_in", "true");
      populateForm();
      showEditor();
      setStatus("login-status", "ورود با موفقیت انجام شد");
    } else {
      setStatus("login-status", "رمز عبور اشتباه است", true);
    }
  });

  saveBtn.addEventListener("click", () => {
    const config = {
      title: document.getElementById("title-input").value.trim() || DEFAULT_CONFIG.title,
      version: document.getElementById("version-input").value.trim() || DEFAULT_CONFIG.version,
      fontFamily: document.getElementById("font-input").value || DEFAULT_CONFIG.fontFamily,
      textSize: Number(document.getElementById("text-size-input").value) || DEFAULT_CONFIG.textSize,
      downloadUrl: document.getElementById("link-input").value.trim() || DEFAULT_CONFIG.downloadUrl,
      buttonText: document.getElementById("button-input").value.trim() || DEFAULT_CONFIG.buttonText,
      statusText: "Update"
    };

    saveConfig(config);
    setStatus("save-status", "تغییرات ذخیره شد");
    window.location.href = "index.html";
  });

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem("editz_admin_logged_in", "true");
    populateForm();
    setStatus("save-status", "به تنظیمات پیش‌فرض بازگشتید");
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("editz_admin_logged_in");
    passwordInput.value = "";
    setStatus("login-status", "خروج شد");
    showLogin();
  });
});
