let listeners = [];

export const listenOnLogin = (cb) => {
  listeners.push(cb);
};

export const notify = () => {
  listeners.forEach(cb => cb());
};