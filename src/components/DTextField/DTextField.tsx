import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { DFormItemProps } from '../DForm/DForm';

interface DTextFieldProps
  extends Omit<TextFieldProps, 'onChange'>,
    Pick<DFormItemProps<string>, 'getValueFromEvent' | 'onChange'> {}

const DTextField: FC<DTextFieldProps> = function ({ getValueFromEvent, onChange, ...props }) {
  return <TextField fullWidth margin="normal" onChange={(e) => onChange && onChange(e.target.value)} {...props} />;
};

export default DTextField;
