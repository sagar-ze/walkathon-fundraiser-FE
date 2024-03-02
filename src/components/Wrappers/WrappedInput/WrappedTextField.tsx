import React from 'react';
import { get } from 'lodash';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

import { IWrappedTextField } from './types/WrappedTextField.type';
import StyledMuiTextField from './StyledMuiTextField';

const WrappedTextField = <T extends FieldValues = FieldValues>(
  props: IWrappedTextField<T>,
) => {
  const {
    label,
    name,
    control,
    xs,
    maxNumber,
    md,
    hide,
    defaultValue,
    required,
    ...rest
  } = props;

  if (hide) return <></>;
  return (
    <Grid container item xs={xs || 12} md={md || undefined}>
      <Controller
        render={({ field, formState: { errors } }) => {
          return (
            <React.Fragment>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Box>
                  <label
                    htmlFor=""
                    id={`${name}-label`}
                    className={required ? 'required-field' : ''}
                  >
                    <Typography className="normal-text" component="span">
                      {label}
                    </Typography>
                  </label>
                </Box>
              </Stack>

              <StyledMuiTextField
                {...rest}
                {...field}
                fullWidth
                size="medium"
                variant="outlined"
                error={!!get(errors, `${name}.message`)}
                helperText={
                  (get(errors, `${name}.message`) as string) || props.helperText
                }
                value={rest?.value || field.value || ''}
                defaultValue={rest?.value || defaultValue || field.value}
                onChange={(event) => {
                  let value = event.target.value;
                  if (
                    value === '' &&
                    (rest.type === 'number' || rest.type === 'float')
                  ) {
                    field.onChange(null);
                  } else if (rest.type === 'number') {
                    if (
                      maxNumber !== undefined &&
                      parseInt(value) > maxNumber
                    ) {
                      value = maxNumber.toString();
                    }
                    if (/^\d*$/.test(value)) {
                      field.onChange(value ? parseInt(value) : value);
                    }
                  } else {
                    field.onChange(value);
                  }
                }}
              />
            </React.Fragment>
          );
        }}
        name={name}
        control={control}
      />
    </Grid>
  );
};

export default WrappedTextField;
