import request from 'request';

const URL = 'https://players-api.developer.alchemy.codes/api';

export function fetchLogin(payload, func) {
  const options = {
    url: `${URL}/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    form: payload,
  };
  return request(options, func);
}

export function fetchPostNewPlayer(payload, func) {
  const token = localStorage.getItem('token');
  const options = {
    url: `${URL}/players`,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    form: payload,
  };
  return request(options, func);
}

export function fetchPostNewUser(payload, func) {
  const options = {
    url: `${URL}/user`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    form: payload,
  };
  return request(options, func);
}

export function fetchGetPlayers(token, func) {
  const options = {
    url: `${URL}/players`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };
  return request(options, func);
}

export function fetchDeletePlayer(token, playerID, func) {
  const options = {
    url: `${URL}/players/${playerID}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  };
  return request(options, func);
}
