type StorageItemAmountProps = {
  brand: string | null;
  amount: number;
  packaging: {
    size: number;
    measurementUnit: string;
  };
  bestBefore?: Date | null;
};

export default StorageItemAmountProps;
