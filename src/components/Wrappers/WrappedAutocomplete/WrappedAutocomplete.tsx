import React from 'react';
import TextField from '@mui/material/TextField';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { Omit, compact, get, isArray } from 'lodash';

type ExtendedInputType = React.InputHTMLAttributes<unknown>['type'] | 'float';
export interface IWrappedAutoComplete<
  T extends FieldValues = FieldValues,
  OptionType = FieldValues | string | number,
> extends Omit<
    AutocompleteProps<OptionType | string | number, boolean, boolean, boolean>,
    'renderInput' | 'options' | 'getOptionLabel' // omit out the default options and getOptionsLabel behavior to implement our custom one on top of default one
  > {
  label?: React.ReactNode | null;
  helperText?: React.ReactNode | null;
  options: OptionType[];
  getOptionLabel?: (option: OptionType) => string; // the argument type needs to be same as that of the options array as the label depends upon the data we have
  name: Path<T>;
  control: Control<T>;
  xs?: number;
  md?: number;
  hide?: boolean;
  type?: ExtendedInputType;
  required?: boolean;
  itemID: string;
}

const WrappedAutocomplete = <
  T extends FieldValues = FieldValues,
  OptionType = FieldValues | string | number,
>(
  props: Omit<IWrappedAutoComplete<T, OptionType>, 'renderInput'>,
) => {
  const { name, required, xs, label, control, ...rest } = props;

  const getOptionValue = (option?: OptionType) =>
    typeof option === 'number' || typeof option === 'string'
      ? option
      : get(option, `${rest.itemID || 'id'}`);

  const getOptionLabel = (option: OptionType): string => {
    if (typeof option === 'number') {
      return option.toString(); // Convert number to string for displaying purposes only
    } else if (typeof option === 'string') {
      return option; // Use string directly
    } else {
      return (option as unknown as { name: string })?.name || ''; // Adjust based on your OptionType structure
    }
  };

  return (
    <Grid container item xs={xs || 12}>
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
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          // since we are only storing the identifiers on the state but the autocomplete needs a full object to know which one to select
          // we retrieve that full object from the options array
          let transformedValue: PathValue<T, Path<T>> = value;
          if (rest.multiple) {
            if (!isArray(value)) transformedValue = [] as PathValue<T, Path<T>>;
            else {
              transformedValue = ([...(rest?.options || [])]?.filter((option) =>
                value?.includes(getOptionValue(option)),
              ) || []) as PathValue<T, Path<T>>;
            }
          } else {
            transformedValue = rest.options?.find(
              (item) => getOptionValue(item) === value,
            ) as PathValue<T, Path<T>>;
          }

          return (
            <Autocomplete
              // by default we extract the name from the given options as a label
              // placing it on the top level allows us to control the option label from the `rest` object that is spread below
              size="medium"
              {...rest}
              getOptionLabel={(option) =>
                rest.getOptionLabel
                  ? rest.getOptionLabel(option as OptionType)
                  : getOptionLabel(option as OptionType)
              }
              onChange={(event, newValue, reason) => {
                // allow components to be controlled from the top level
                if (rest.onChange) {
                  rest.onChange(event, newValue, reason);
                  return;
                }
                // if the multiple options is selected , we need to pick only the itemID's
                if (rest.multiple) {
                  onChange(
                    compact(
                      ((newValue || []) as OptionType[])?.map((item) =>
                        getOptionValue(item),
                      ),
                    ),
                  );
                } else {
                  // rather than storing a whole object and doing transformation on multiple places, we just store the identifier of that object and identifier is passed as 'itemID'
                  onChange(getOptionValue(newValue as OptionType));
                }
              }}
              //  It handles value changes, error display, and integrates with the form's validation system. The renderInput method defines how the
              // text field within the autocomplete should be rendered, including error handling and displaying a label.
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={
                    (get(errors, `${name}.message`) as string) ||
                    rest.helperText
                  }
                  error={!!get(errors, `${name}.message`)}
                />
              )}
              value={transformedValue ?? (rest.multiple ? [] : null)}
              style={{ width: '100%' }}
            />
          );
        }}
      />
    </Grid>
  );
};

export default WrappedAutocomplete;
