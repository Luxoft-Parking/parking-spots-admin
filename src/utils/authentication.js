async function logout() {
  localStorage.removeItem('currentUser');
}

async function login(username, password) {
  const requestOptions = {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    }),
    credentials: 'same-origin'
  };
  const response = await fetch('http://localhost:3000/v1/user/login', requestOptions);

  if (!response.ok) {
    if ([400, 401, 403].includes(response.status)) {
      logout();
      return false;
    }
  } else {
    const jwt = await response.text();

    localStorage.setItem('currentUser', jwt);
  }

  return true;
}

module.exports = {
  login,
  logout,
  get currentUser() { return localStorage.getItem('currentUser'); }
};
