import { qs, qsAll } from '../dom-helpers';

class Video {
  constructor() {
    this.videos = qsAll('.video');

    if (this.videos.length) {
      this._run();
    }
  }

  _run() {
    this.videos.forEach((video) => {
      this._setupVideo(video);
    });
  }

  _setupVideo(video) {
    const link = qs('.video__link', video);
    const button = qs('.video__play', video);
    const title = video.dataset.title;
    const id = video.dataset.id;

    video.addEventListener('click', () => {
      const iframe = this._createIframe(id, title);

      link.remove();
      button.remove();

      video.appendChild(iframe);

      iframe.focus();
    });

    link.removeAttribute('aria-labelledby');
    link.removeAttribute('href');
    link.setAttribute('role', 'presentation');
  }

  _createIframe(id, title) {
    const iframe = document.createElement('iframe');

    iframe.setAttribute('aria-label', title);
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    );
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${id}?rel=0&showInfo=0&autoplay=1`);
    iframe.classList.add('video__media');

    return iframe;
  }
}

export default Video;
