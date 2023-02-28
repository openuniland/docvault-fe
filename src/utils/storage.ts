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

const getTokens = () =>
  JSON.parse(localStorage.getItem("tokens") || '{"error": "null"}');

const getSidebarStatus = () =>
  JSON.parse(localStorage.getItem("isOpenSidebar") || '{"status":"false"}');

// Remove items from storage
export const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

export {
  getLanguage,
  getTokens,
  setLanguage,
  setTokens,
  setSidebarStatus,
  getSidebarStatus,
};
