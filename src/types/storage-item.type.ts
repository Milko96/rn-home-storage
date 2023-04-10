import StorageItemAmountProps from "./storage-item-amount.type";

type StorageItemProps = {
  id: string;
  name: string;
  amounts: StorageItemAmountProps[];
};

export default StorageItemProps;
