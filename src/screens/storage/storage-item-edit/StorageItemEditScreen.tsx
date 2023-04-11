import React, { useState } from 'react';
import { TextInput } from '../../../global/styled-components/Input.styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRoute } from '@react-navigation/native';
import StorageItemProps from '../../../types/storage-item.type';
import service from '../../../services/storage.service';
import DatePicker from 'react-native-date-picker';
import { Text, TouchableOpacity } from 'react-native';

const StorageItemEditScreen = () => {
  const route = useRoute();
  const itemId = (route.params as { itemId: string })?.itemId;

  const item: StorageItemProps = (itemId && service.find(itemId)) || {
    id: '',
    name: '',
    amounts: [
      {
        brand: '',
        amount: 0,
        packaging: {
          size: 0,
          measurementUnit: ''
        },
        bestBefore: new Date()
      }
    ]
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(() => 'Name is required')
      .max(50, () => 'Name is too long'),
    brand: yup.string().max(50, () => 'Brand is too long'),
    amount: yup.number().required(() => 'Amount is required'),
    size: yup.number(),
    measurementUnit: yup.string().max(50, () => 'Measurement unit is too long'),
    bestBefore: yup.date()
  });

  const formik = useFormik({
    initialValues: {
      name: item.name,
      brand: item.amounts[0].brand ?? '',
      amount: item.amounts[0].amount.toString(),
      size: item.amounts[0].packaging.size.toString(),
      measurementUnit: item.amounts[0].packaging.measurementUnit,
      bestBefore: item.amounts[0].bestBefore
    },
    onSubmit: () => {},
    validationSchema: validationSchema,
    validateOnMount: true
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <TextInput
        placeholder='Name'
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
      />
      <TextInput
        placeholder='Brand'
        value={formik.values.brand}
        onChangeText={formik.handleChange('brand')}
        onBlur={formik.handleBlur('brand')}
      />
      <TextInput
        placeholder='Amount'
        value={formik.values.amount}
        onChangeText={formik.handleChange('amount')}
        onBlur={formik.handleBlur('amount')}
      />
      <TextInput
        placeholder='Size'
        value={formik.values.size}
        onChangeText={formik.handleChange('size')}
        onBlur={formik.handleBlur('size')}
      />
      <TextInput
        placeholder='Measurement Unit'
        value={formik.values.measurementUnit}
        onChangeText={formik.handleChange('measurementUnit')}
        onBlur={formik.handleBlur('measurementUnit')}
      />
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text> {formik.values.bestBefore?.toLocaleDateString()} </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode='date'
        title={'Best before'}
        theme='dark'
        date={formik.values.bestBefore ?? new Date() as Date}
        open={open}
        onConfirm={date => {
          setOpen(false);
          formik.setFieldValue('bestBefore', date);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default StorageItemEditScreen;
