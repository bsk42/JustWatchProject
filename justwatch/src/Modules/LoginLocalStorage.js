export function GetLoggedInUser() {
    return localStorage.getItem('currentUser');
  }
  
export function SetLoggedInUser(user) {
    localStorage.setItem('currentUser', user);
  }
  
  