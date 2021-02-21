const SUCCESS_STATUS = 200;

class AJAX {
  constructor() {
    if (this.constructor === AJAX) {
      throw new TypeError('Can not construct abstract class.');
    }
  }

  static post(options) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', options.url);

    options.beforeSend();

    xhr.addEventListener('load', () => {
      if (xhr.status === SUCCESS_STATUS) {
        options.success(xhr.response);
      } else {
        options.error(xhr.statusText, xhr.response);
      }

      options.complete();
    });

    xhr.send(options.data);
  }
}

export default AJAX;
