export function getLoggedInUser() {
    return localStorage.getItem('currentUser');
  }
  
export function setLoggedInUser(user) {
    localStorage.setItem('currentUser', user);
  }
  
  