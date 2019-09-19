import auth from './authentication'

export async function listUsers() {
  const requestOptions = {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-user-jwt': auth.currentUser
    },
    credentials: 'same-origin'
  }

  try {
    const response = await fetch('http://localhost:3000/v1/user', requestOptions);
    if (response.ok) {
      return response.json()
    }
  } catch (error) {
    console.error(error)
  }

}

export default {
  listUsers
}
