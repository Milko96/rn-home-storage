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
    existing.amounts[0].brand = item.amounts[0].brand;
    existing.amounts[0].amount = item.amounts[0].amount;
    existing.amounts[0].packaging.size = item.amounts[0].packaging.size;
    existing.amounts[0].packaging.measurementUnit = item.amounts[0].packaging.measurementUnit;
    existing.amounts[0].bestBefore = item.amounts[0].bestBefore;
  }
};

export default { list, find, add, update };
