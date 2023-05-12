import StorageItemProps from '../types/storage-item.type';

const items: StorageItemProps[] = [
  {
    id: '30818ee5-dbea-4125-9823-927bb45bc847',
    name: 'étolaj',
    amounts: [
      { brand: 'Vénusz', amount: 2, packaging: { size: 1, measurementUnit: 'l' }, bestBefore: new Date('2023-06-10') }
    ]
  },
  {
    id: '37d907d7-3a6b-4702-bade-35fcdfbab289',
    name: 'só',
    amounts: [{ brand: null, amount: 5, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: '65e072be-6550-4f84-8a5c-ab3e73dc575a',
    name: 'őrölt feketebors',
    amounts: [{ brand: 'Kania', amount: 1, packaging: { size: 1, measurementUnit: 'cs' } }]
  },
  {
    id: 'fea1f3c0-bf45-4d80-87b4-a0afde31d6c4',
    name: 'szemes feketebors',
    amounts: [{ brand: 'Kania', amount: 1, packaging: { size: 1, measurementUnit: 'cs' } }]
  },
  {
    id: '2c624eec-f195-4802-bc5a-d30531bce163',
    name: 'cukor',
    amounts: [{ brand: null, amount: 4, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: '79e41eae-69e1-402f-b52c-31be36e561f9',
    name: 'búzaliszt',
    amounts: [{ brand: 'Tescos', amount: 3, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: '2a1db3e7-1472-403f-a9ae-3348253b5cd5',
    name: 'rétesliszt',
    amounts: [{ brand: 'Aldi', amount: 1, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: 'a2726fc7-eaf6-490a-82e9-d93f129d19a2',
    name: 'búzadara',
    amounts: [{ brand: 'Tescos', amount: 1, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: '2a3b74a9-7340-42b6-9d57-bdff04308cf3',
    name: 'kukoricaliszt',
    amounts: [{ brand: null, amount: 2, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: '1dcbd722-afae-45f6-9dd7-97fffab5c0b9',
    name: 'kukoricadara',
    amounts: [{ brand: null, amount: 2, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: '9f8fd7ea-83d0-4949-86e9-712e3d671665',
    name: 'porcukor',
    amounts: [{ brand: null, amount: 1, packaging: { size: 1, measurementUnit: 'kg' } }]
  },
  {
    id: '09725b96-b470-4347-ab3e-f51280244417',
    name: 'vaníliás cukor',
    amounts: [
      { brand: 'Lidl', amount: 1, packaging: { size: 100, measurementUnit: 'g' } },
      { brand: 'Cukormanufaktúra', amount: 1, packaging: { size: 100, measurementUnit: 'g' } },
      { brand: 'Dr. Oetker', amount: 4, packaging: { size: 8, measurementUnit: 'g' } },
      { brand: 'Aldi', amount: 1, packaging: { size: 8, measurementUnit: 'g' } }
    ]
  },
  {
    id: 'c163ee20-399f-42e4-aed0-d68a5d9a4dd4',
    name: 'szódabikarbóna',
    amounts: [{ brand: null, amount: 1, packaging: { size: 1, measurementUnit: 'cs' } }]
  },
  {
    id: 'e370b183-884a-4b5e-a563-9e8aa6371c27',
    name: 'chia mag',
    amounts: [{ brand: 'Tesco', amount: 1, packaging: { size: 100, measurementUnit: 'g' } }]
  },
  {
    id: '9d79409b-741a-49c7-9d5e-57576b32ba72',
    name: 'ketchup',
    amounts: [{ brand: 'Heinz', amount: 1, packaging: { size: 400, measurementUnit: 'g' } }]
  },
  {
    id: '9f8749ae-04fa-49e6-b0a5-667d5ba3924a',
    name: 'mustár',
    amounts: [{ brand: 'Globus', amount: 1, packaging: { size: 400, measurementUnit: 'g' } }]
  },
  {
    id: '5b8732ab-acff-4bcb-b8ef-6ea780dff7fb',
    name: 'majonéz',
    amounts: [{ brand: 'Kania', amount: 1, packaging: { size: 400, measurementUnit: 'g' } }]
  }
];

export default items;
