import items from '../persistence/mock-items';

const list = () => {
  return items;
};

const find = (id: string) => {
  return items.find(x => x.id == id);
};

export default {list, find};
