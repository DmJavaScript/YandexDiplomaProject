export const glideConfig = {
  container: '#options-focus-at',
  settings: {
    type: 'slider',
    bound: 'false',
    gap: 16,
    startAt: 2,
    perView: 3,
    peek: 104,
    focusAt: 'center',
    perTouch: 'unlimited',
    breakpoints: {
      1280: {
        perView: 2.7,
        peek: 86,
        focusAt: 'center',
      },
      1125: {
        perView: 2.40,
        peek: 72,
        focusAt: 0,
      },
      1080: {
        perView: 2.275,
        peek: 75,
        focusAt: 0,
      },
      1024: {
        perView: 2.15,
        peek: 73,
        focusAt: 0,
      },
      990: {
        type: 'slider',
        bound: 'true',
        startAt: 0,
        perView: 2.57,
        peek: 0,
        focusAt: 0,
      },
      768: {
        gap: 8,
        perView: 2.257,
        peek: 0,
        focusAt: 0,
      },
      750: {
        perView: 2.19,
        peek: 0,
        focusAt: 0,
      },
      720: {
        perView: 2.091,
        peek: 0,
        focusAt: 0,
      },
      425: {
        perView: 1.283,
        peek: 0,
        focusAt: 0,
      },
      375: {
        perView: 1.1375,
        peek: 0,
        focusAt: 0,
      },
      320: {
        gap: 8,
        perView: 1.108,
        peek: 0,
        focusAt: 0,
      },
    }
  }
}
