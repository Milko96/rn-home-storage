import React, { useState } from 'react';
import { TextInput } from '../../../components/styled-components/Input.styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import StorageItemProps from '../../../types/storage-item.type';
import service from '../../../services/storage.service';
import DatePicker from 'react-native-date-picker';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { InputErrorMessage } from '../../../components/input-error-message';
import { Button } from '../../../components/storage-item/Button.styled';
import Icon from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';

const StorageItemEditScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const screen = useWindowDimensions();
  const itemId = (route.params as { itemId: string })?.itemId;
  const { t } = useTranslation();

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
    amount: yup.number(), //mivel lista a formban, így nem éppen működik .required(() => 'Amount is required'),
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
      amounts: item?.amounts
    },
    onSubmit: () => {
      const dto = {
        id: itemId,
        name: formik.values.name,
        amounts: formik.values.amounts!
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
    <>
      <View style={{ height: '100%', justifyContent: 'space-between' }}>
        <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
          <TextInput
            style={{ marginTop: 5 }}
            autoCapitalize='none'
            placeholder={t('item_edit:name')}
            placeholderTextColor={theme.placeholder}
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          <InputErrorMessage errors={formik.errors.name} isSubmitting={formik.isSubmitting} />
          <View>
            <FlatList
              horizontal
              data={formik.values.amounts}
              snapToInterval={screen.width - 10}
              renderItem={item => (
                <View
                  style={{ borderWidth: 1, marginVertical: 5, padding: 5, borderRadius: 10, width: screen.width - 10 }}>
                  <TextInput
                    placeholder={t('item_edit:brand')}
                    placeholderTextColor={theme.placeholder}
                    value={formik.values.amounts![item.index].brand ?? undefined}
                    onChangeText={formik.handleChange(`amounts[${item.index}].brand`)}
                    onBlur={formik.handleBlur(`amounts[${item.index}].brand`)}
                  />
                  <InputErrorMessage errors={formik.errors.amounts} isSubmitting={formik.isSubmitting} />
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={{ marginTop: 5, marginRight: 5 }}
                      keyboardType='numeric'
                      placeholder={t('item_edit:amount')}
                      placeholderTextColor={theme.placeholder}
                      value={formik.values.amounts![item.index].amount?.toString() ?? undefined}
                      onChangeText={v => formik.setFieldValue(`amounts[${item.index}].amount`, v)}
                      onBlur={formik.handleBlur(`amounts[${item.index}].amount`)}
                    />
                    <InputErrorMessage errors={formik.errors.amounts} isSubmitting={formik.isSubmitting} />
                    <Text style={{ textAlignVertical: 'center', fontSize: 25, marginRight: 5, color: theme.text }}>
                      x
                    </Text>
                    <TextInput
                      style={{ marginTop: 5, marginRight: 5 }}
                      keyboardType='numeric'
                      placeholder={t('item_edit:size')}
                      placeholderTextColor={theme.placeholder}
                      value={formik.values.amounts![item.index].size?.toString() ?? undefined}
                      onChangeText={v => formik.setFieldValue(`amounts[${item.index}].size`, v)}
                      onBlur={formik.handleBlur(`amounts[${item.index}].size`)}
                    />
                    <InputErrorMessage errors={formik.errors.amounts} isSubmitting={formik.isSubmitting} />
                    <TextInput
                      style={{ marginTop: 5 }}
                      autoCapitalize='none'
                      placeholder={t('item_edit:measurement_unit')}
                      placeholderTextColor={theme.placeholder}
                      value={formik.values.amounts![item.index].measurementUnit ?? undefined}
                      onChangeText={formik.handleChange(`amounts[${item.index}].measurementUnit`)}
                      onBlur={formik.handleBlur(`amounts[${item.index}].measurementUnit`)}
                    />
                    <InputErrorMessage errors={formik.errors.amounts} isSubmitting={formik.isSubmitting} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingVertical: 10,
                      justifyContent: 'space-between'
                    }}>
                    <Text
                      style={{
                        color: formik.values.amounts![item.index].bestBefore ? theme.text : theme.placeholder,
                        paddingStart: 10
                      }}>
                      {formik.values.amounts![item.index].bestBefore?.toLocaleDateString() ??
                        t('item_edit:best_before')}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      {formik.values.amounts![item.index].bestBefore && (
                        <TouchableOpacity
                          onPress={() => formik.setFieldValue(`amounts![${item.index}].bestBefore`, null)}>
                          <Icon name='close' size={22} color={theme.text} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => setOpen(true)}>
                        <Icon name='calendar' size={22} color={theme.text} />
                      </TouchableOpacity>
                    </View>
                    <InputErrorMessage errors={formik.errors.amounts} isSubmitting={formik.isSubmitting} />
                    <DatePicker
                      modal
                      mode='date'
                      title={t('item_edit:best_before')}
                      theme='dark'
                      date={formik.values.amounts![item.index].bestBefore ?? (new Date() as Date)}
                      open={open}
                      onConfirm={date => {
                        setOpen(false);
                        formik.setFieldValue(`amounts![${item.index}].bestBefore`, date);
                      }}
                      onCancel={() => setOpen(false)}
                    />
                  </View>
                </View>
              )}></FlatList>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ backgroundColor: theme.background }} activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Text style={{ color: theme.text }}>{t('common:cancel')}</Text>
          </Button>
          <Button
            style={{ backgroundColor: theme.success }}
            activeOpacity={0.8}
            disabled={!formik.isValid}
            onPress={() => formik.handleSubmit()}>
            <Text style={{ color: theme.text }}>{t('common:save')}</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default StorageItemEditScreen;
