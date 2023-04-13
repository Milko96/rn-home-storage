import React, { useState } from 'react';
import { TextInput } from '../../../global/styled-components/Input.styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import StorageItemProps from '../../../types/storage-item.type';
import service from '../../../services/storage.service';
import DatePicker from 'react-native-date-picker';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { InputErrorMessage } from '../../../components/input-error-message';

const StorageItemEditScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const itemId = (route.params as { itemId: string })?.itemId;

  const navigation = useNavigation();

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
    onSubmit: () => {
      ToastAndroid.show('Saved', ToastAndroid.SHORT);
    },
    validationSchema: validationSchema
    // TODO ha új elemről van szó és ez bent van, akkor "Maximum update depth exceeded..."
    //validateOnMount: true
  });

  const [open, setOpen] = useState(false);

  return (
    <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
      <TextInput
        style={{ marginTop: 5 }}
        placeholder='Name'
        placeholderTextColor={theme.text}
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
      />
      <InputErrorMessage errors={formik.errors.name} isSubmitting={formik.isSubmitting} />
      <TextInput
        style={{ marginTop: 5 }}
        placeholder='Brand'
        placeholderTextColor={theme.text}
        value={formik.values.brand}
        onChangeText={formik.handleChange('brand')}
        onBlur={formik.handleBlur('brand')}
      />
      <InputErrorMessage errors={formik.errors.brand} isSubmitting={formik.isSubmitting} />
      <TextInput
        style={{ marginTop: 5 }}
        placeholder='Amount'
        placeholderTextColor={theme.text}
        value={formik.values.amount}
        onChangeText={formik.handleChange('amount')}
        onBlur={formik.handleBlur('amount')}
      />
      <InputErrorMessage errors={formik.errors.amount} isSubmitting={formik.isSubmitting} />
      <TextInput
        style={{ marginTop: 5 }}
        placeholder='Size'
        placeholderTextColor={theme.text}
        value={formik.values.size}
        onChangeText={formik.handleChange('size')}
        onBlur={formik.handleBlur('size')}
      />
      <InputErrorMessage errors={formik.errors.size} isSubmitting={formik.isSubmitting} />
      <TextInput
        style={{ marginTop: 5 }}
        placeholder='Measurement unit'
        placeholderTextColor={theme.text}
        value={formik.values.measurementUnit}
        onChangeText={formik.handleChange('measurementUnit')}
        onBlur={formik.handleBlur('measurementUnit')}
      />
      <InputErrorMessage errors={formik.errors.measurementUnit} isSubmitting={formik.isSubmitting} />
      <TouchableOpacity
        style={{ marginTop: 5, borderWidth: 1, borderRadius: 10, paddingVertical: 10, justifyContent: 'center' }}
        onPress={() => setOpen(true)}>
        <Text style={{ color: theme.text, paddingStart: 10 }}> {formik.values.bestBefore?.toLocaleDateString()} </Text>
      </TouchableOpacity>
      <InputErrorMessage errors={formik.errors.bestBefore} isSubmitting={formik.isSubmitting} />
      <DatePicker
        modal
        mode='date'
        title={'Best before'}
        theme='dark'
        date={formik.values.bestBefore ?? (new Date() as Date)}
        open={open}
        onConfirm={date => {
          setOpen(false);
          formik.setFieldValue('bestBefore', date);
        }}
        onCancel={() => setOpen(false)}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            width: '50%',
            alignItems: 'center',
            marginVertical: 20,
            backgroundColor: theme.background,
            justifyContent: 'center',
            height: 60
          }}
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{ color: theme.text }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            alignItems: 'center',
            marginVertical: 20,
            backgroundColor: '#4b753d',
            justifyContent: 'center',
            height: 60
          }}
          activeOpacity={0.8}
          disabled={!formik.isValid}
          onPress={() => {
            formik.handleSubmit();
          }}>
          <Text style={{ color: theme.text }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StorageItemEditScreen;
