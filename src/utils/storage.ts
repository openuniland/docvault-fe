// Remove items from storage
export const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

// SET STORAGE
const setLanguage = (language: any) => {
  localStorage.setItem("language", JSON.stringify(language));
};

const setTokens = (tokens: {}) => {
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

const setSidebarStatus = (status: {}) => {
  localStorage.setItem("isOpenSidebar", JSON.stringify(status));
};

// GET FROM STORAGE
const getLanguage = () =>
  JSON.parse(localStorage.getItem("language") || '{"":""}');

const getTokens = () => {
  const tokens = localStorage.getItem("tokens") || '{"error": "null"}';

  if (tokens === "undefined") {
    removeItemFromStorage("tokens");
    window.location.replace("/");
  }

  return JSON.parse(tokens);
};

const getSidebarStatus = () =>
  JSON.parse(localStorage.getItem("isOpenSidebar") || '{"status":"false"}');

export {
  getLanguage,
  getTokens,
  setLanguage,
  setTokens,
  setSidebarStatus,
  getSidebarStatus,
};
