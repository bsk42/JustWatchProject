export function getMyObject(username) {
  return localStorage.getItem(username);
}

export function setObjectValue(key, value) {
  localStorage.setItem(key, value);
}