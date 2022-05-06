export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  
export function setLoggedInUser(user) {
    localStorage.setItem('currentUser', user);
  }
  
  