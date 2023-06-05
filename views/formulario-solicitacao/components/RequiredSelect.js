import React, { } from 'react';
import { FormControl, Select, WarningOutlineIcon } from 'native-base';

const RequiredSelect = ({ items, valueField, textField, label, placeholder, onChangeHandler, error }) => {
  return <FormControl isRequired isInvalid={error}>
    <FormControl.Label>{label}</FormControl.Label>
    <Select placeholder={placeholder} onValueChange={onChangeHandler} >
      {items.map(x => (<Select.Item label={x[textField]} value={`${x[valueField]}`} key={`pesoLimite-${x[valueField]}`} />))}
    </Select>
    {error && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {error}
    </FormControl.ErrorMessage>}
  </FormControl>
}

export default RequiredSelect;