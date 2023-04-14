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
import { Button } from '../../../components/storage-item/Button.styled';
import Icon from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';

const StorageItemEditScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const itemId = (route.params as { itemId: string })?.itemId;

  const navigation = useNavigation();

  const item: StorageItemProps | null = (itemId && service.find(itemId)) || null;

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(() => 'Name is required')
      .max(50, () => 'Name is too long'),
    brand: yup
      .string()
      .nullable()
      .max(50, () => 'Brand is too long'),
    amount: yup.number().required(() => 'Amount is required'),
    size: yup.number().nullable(),
    measurementUnit: yup
      .string()
      .nullable()
      .max(50, () => 'Measurement unit is too long'),
    bestBefore: yup.date().nullable()
  });

  const formik = useFormik({
    initialValues: {
      name: item?.name ?? '',
      brand: item?.amounts[0].brand ?? null,
      amount: item?.amounts[0].amount?.toString() ?? null,
      size: item?.amounts[0].packaging.size?.toString() ?? null,
      measurementUnit: item?.amounts[0].packaging.measurementUnit ?? null,
      bestBefore: item?.amounts[0].bestBefore ?? null
    },
    onSubmit: () => {
      const dto = {
        id: itemId,
        name: formik.values.name,
        amounts: [
          {
            brand: formik.values.brand,
            amount: formik.values.amount ? +formik.values.amount : null,
            packaging: {
              size: formik.values.size ? +formik.values.size : null,
              measurementUnit: formik.values.measurementUnit
            },
            bestBefore: formik.values.bestBefore && new Date(formik.values.bestBefore)
          }
        ]
      };
      if (itemId) {
        service.update(dto);
      } else {
        service.add({ ...dto, id: uuid.v4().toString() });
      }
      ToastAndroid.show('Saved', ToastAndroid.SHORT);
      navigation.goBack();
    },
    validationSchema: validationSchema
    // TODO ha új elemről van szó és ez bent van, akkor "Maximum update depth exceeded..."
    //validateOnMount: true
  });

  const [open, setOpen] = useState(false);

  return (
    <View style={{ height: '100%', justifyContent: 'space-between' }}>
      <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
        <TextInput
          style={{ marginTop: 5 }}
          autoCapitalize='none'
          placeholder='Name'
          placeholderTextColor={theme.placeholder}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
        />
        <InputErrorMessage errors={formik.errors.name} isSubmitting={formik.isSubmitting} />
        <TextInput
          style={{ marginTop: 5 }}
          placeholder='Brand'
          placeholderTextColor={theme.placeholder}
          value={formik.values.brand ?? undefined}
          onChangeText={formik.handleChange('brand')}
          onBlur={formik.handleBlur('brand')}
        />
        <InputErrorMessage errors={formik.errors.brand} isSubmitting={formik.isSubmitting} />
        <TextInput
          style={{ marginTop: 5 }}
          keyboardType='numeric'
          placeholder='Amount'
          placeholderTextColor={theme.placeholder}
          value={formik.values.amount ?? undefined}
          onChangeText={formik.handleChange('amount')}
          onBlur={formik.handleBlur('amount')}
        />
        <InputErrorMessage errors={formik.errors.amount} isSubmitting={formik.isSubmitting} />
        <TextInput
          style={{ marginTop: 5 }}
          keyboardType='numeric'
          placeholder='Size'
          placeholderTextColor={theme.placeholder}
          value={formik.values.size ?? undefined}
          onChangeText={formik.handleChange('size')}
          onBlur={formik.handleBlur('size')}
        />
        <InputErrorMessage errors={formik.errors.size} isSubmitting={formik.isSubmitting} />
        <TextInput
          style={{ marginTop: 5 }}
          autoCapitalize='none'
          placeholder='Measurement unit'
          placeholderTextColor={theme.placeholder}
          value={formik.values.measurementUnit ?? undefined}
          onChangeText={formik.handleChange('measurementUnit')}
          onBlur={formik.handleBlur('measurementUnit')}
        />
        <InputErrorMessage errors={formik.errors.measurementUnit} isSubmitting={formik.isSubmitting} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 10,
            justifyContent: 'space-between'
          }}>
          <Text style={{ color: formik.values.bestBefore ? theme.text : theme.placeholder, paddingStart: 10 }}>
            {formik.values.bestBefore?.toLocaleDateString() ?? 'Best before'}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {formik.values.bestBefore && (
              <TouchableOpacity onPress={() => formik.setFieldValue('bestBefore', null)}>
                <Icon name='close' size={22} color={theme.text} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => setOpen(true)}>
              <Icon name='calendar' size={22} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
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
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button style={{ backgroundColor: theme.background }} activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text style={{ color: theme.text }}>Cancel</Text>
        </Button>
        <Button
          style={{ backgroundColor: theme.success }}
          activeOpacity={0.8}
          disabled={!formik.isValid}
          onPress={() => formik.handleSubmit()}>
          <Text style={{ color: theme.text }}>Save</Text>
        </Button>
      </View>
    </View>
  );
};

export default StorageItemEditScreen;
