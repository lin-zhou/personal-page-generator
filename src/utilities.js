const dev = true;
export let baseUrl = "PRODUCTION";
if (dev) {
  baseUrl = "http://localhost:1080";
}

export let authToken = localStorage.getItem("token");

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

export function logout() {
  localStorage.removeItem("token");
  window.location.replace("/");
}

export function setAuthToken(t) {
  window.location.reload();
  localStorage.setItem("token", t);
  authToken = t;
}
