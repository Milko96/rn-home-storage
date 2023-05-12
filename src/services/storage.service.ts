import items from '../persistence/mock-items';
import StorageItemProps from '../types/storage-item.type';

const list = (): StorageItemProps[] => {
  return items;
};

const find = (id: string) => {
  return items.find(x => x.id == id);
};

const add = (item: StorageItemProps) => {
  items.push(item);
};

const update = (item: StorageItemProps) => {
  const existing = find(item.id);
  if (existing) {
    existing.name = item.name;
    existing.amounts = [...item.amounts];
  }
};

export default { list, find, add, update };
