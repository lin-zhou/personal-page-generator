const dev = true;
export let baseUrl = "PRODUCTION";
if (dev) {
  baseUrl = "http://localhost:1080";
}

export let authToken = null;

export function request(url, body) {
  if (body === undefined) {
    body = {};
  }
  body["headers"] = {
    Authorization: `JWT ${authToken}`,
    "Content-Type": "application/json",
  };
  return fetch(url, body);
}

export function upload(url, body) {
  if (body === undefined) {
    body = {};
  }
  if (body.hasOwnProperty("headers")) {
    body["headers"]["Authorization"] = `JWT ${authToken}`;
  } else {
    body["headers"] = {
      Authorization: `JWT ${authToken}`,
    };
  }
  return fetch(url, body);
}

export function setAuthToken(t) {
  authToken = t;
}
