export class GithubApi {
  constructor(options) {
    this._options = options;
  }

  getSlidesData () {
    return fetch(`${this._options.baseUrl}`, {
      headers: this._options.headers,
      method: 'GET'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}