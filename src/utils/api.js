import auth from './authentication';

const requestOptions = {
  mode: 'cors',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-user-jwt': auth.currentUser
  },
  credentials: 'same-origin'
};

export const listUsers = async () => {

  try {
    const response = await fetch('http://localhost:3000/v1/user', requestOptions);

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

};

export const createUser = (fullName, username, password, team, isDriver, onSuccess, onError) => async () => {
  try {
    const response = await fetch('http://localhost:3000/v1/user', {
      ...requestOptions,
      method: 'POST',
      body: JSON.stringify({ fullName, username, password, team, isDriver })
    });

    if (response.ok) {
      onSuccess(await response.json());
    } else {
      onError(await response.json());
    }

  } catch (error) {
    onError(error);
  }
};

export default {
  listUsers,
  createUser
};
