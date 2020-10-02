const randomColor = () =>
  `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

export { randomColor };
