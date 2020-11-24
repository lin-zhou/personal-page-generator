const dev = false;
export let baseUrl = "https://parser.zhoulindsay.com";
if (dev) {
  baseUrl = "http://localhost:1080";
}

export let baseRegular = "/personal-page-generator/"
if (dev) {
  baseRegular = "/"
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
  window.location.replace(baseRegular);
}

export function setAuthToken(t) {
  window.location.reload();
  localStorage.setItem("token", t);
  authToken = t;
}
