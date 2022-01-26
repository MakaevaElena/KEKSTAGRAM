const Urls = {
  GET: 'https://24.javascript.pages.academy/kekstagram/data',
  POST: 'https://24.javascript.pages.academy/kekstagram',
};

const request = (onSuccess, onFail, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

export {request};
