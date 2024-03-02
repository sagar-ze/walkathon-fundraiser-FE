import React from 'react';
import { BaseTextFieldProps } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

type ExtendedInputType = React.InputHTMLAttributes<unknown>['type'] | 'float';

export interface IWrappedTextField<T extends FieldValues = FieldValues>
  extends BaseTextFieldProps {
  label?: React.ReactNode | null;
  name: Path<T>;
  maxNumber?: number;
  control?: Control<T>;
  isActive?: boolean;
  xs?: number;
  md?: number;
  hide?: boolean;
  type?: ExtendedInputType;
  currency?: boolean;
}
