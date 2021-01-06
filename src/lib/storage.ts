export const setStorage = (name: string, value: any, time: any) => {
  if (!name) return;
  const storage = {
    createdTime: new Date().getTime(),
    cacheTime: time,
    data: value,
  };
  window.localStorage.setItem(name, JSON.stringify(storage));
};

export const clearStorage = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

export const getStorage = (name: string) => {
  if (!name) return;
  const storage = JSON.parse(window.localStorage.getItem(name) || '[]');
  if (!storage) return;
  if (storage.cacheTime && new Date().getTime() - storage.createdTime > storage.cacheTime) {
    clearStorage(name);
    return;
  }
  return storage.data; // eslint-disable-line
};
