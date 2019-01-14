import request from 'request';

const URL = 'https://players-api.developer.alchemy.codes';

export default function fetchLogin(payload, func) {
  const options = {
    url: 'https://players-api.developer.alchemy.codes/api/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    form: payload,
  };
  return request(options, func);
}
