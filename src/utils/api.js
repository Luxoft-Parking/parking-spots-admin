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

export const listSpots = async () => {

  try {
    const response = await fetch('http://localhost:3000/v1/spot', requestOptions);

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

};

export const createOrEditUser = (userId, fullName, username, password, team, isDriver, onSuccess, onError) => async () => {
  if (userId) {
    return editUser(userId, fullName, username, password, team, isDriver, onSuccess, onError);
  } else {
    return createUser(fullName, username, password, team, isDriver, onSuccess, onError);
  }
};

export const createOrEditSpot = (spotId, level, number, onSuccess, onError) => async () => {
  if (spotId) {
    return editSpot(spotId, level, number, onSuccess, onError);
  } else {
    return createSpot(level, number, onSuccess, onError);
  }
};

const editUser = async (userId, fullName, username, password, team, isDriver, onSuccess, onError) => {
  try {
    const response = await fetch(`http://localhost:3000/v1/user/${userId}`, {
      ...requestOptions,
      method: 'PUT',
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
const createUser = async (fullName, username, password, team, isDriver, onSuccess, onError) => {
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
const editSpot = async (spotId, level, number, onSuccess, onError) => {
  try {
    const response = await fetch(`http://localhost:3000/v1/spot/${spotId}`, {
      ...requestOptions,
      method: 'PUT',
      body: JSON.stringify({ level, number })
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
const createSpot = async (level, number, onSuccess, onError) => {
  try {
    const response = await fetch('http://localhost:3000/v1/spot', {
      ...requestOptions,
      method: 'POST',
      body: JSON.stringify({ level, number })
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
  listSpots,
  createOrEditUser,
  createOrEditSpot,
};
