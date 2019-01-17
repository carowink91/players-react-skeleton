const URL = 'https://players-api.developer.alchemy.codes/api';

export function fetchLogin(payload) {
  return fetch(`${URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(res => res.json());
}

export function fetchPostNewUser(payload) {
  return fetch(`${URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(res => res.json());
}

export function fetchPostNewPlayer(payload, token) {
  return fetch(`${URL}/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
}

export function fetchGetPlayers(token) {
  return fetch(`${URL}/players`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}

export function fetchDeletePlayer(playerID, token) {
  return fetch(`${URL}/players/${playerID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}
