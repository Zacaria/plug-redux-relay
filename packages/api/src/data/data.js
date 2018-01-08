const DATA_LENGTH = 30;

const counter = id => ({
  myId: `${id}`,
  value: id % 3,
});

const counters = Array.from({ length: DATA_LENGTH }).map((_, i) => counter(i));

export const getCounter = id => counters.find(e => e.myId === id);

export const getCounters = () => counters;
