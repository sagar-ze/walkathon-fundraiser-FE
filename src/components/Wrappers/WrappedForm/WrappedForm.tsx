import React from 'react';
import { Grid, Typography } from '@mui/material';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import SubmitButton from '../WrappedButtons/SubmitButton';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const extractServerValidationError = (_error: any) => '';

interface WrappedFormProps<
  TVariables extends FieldValues,
  TData,
  TError = unknown,
> {
  isAutoCloseDisable?: boolean;
  handleClose?: () => void;
  useFormMethods: UseFormReturn<TVariables>; // Add this line
  mutation: UseMutationResult<TData, TError, TVariables>;
  children: React.ReactNode;
  submitButtonLabel?: string;
  disableSubmitButton?: boolean;
  createSuccessText?: string;
  isSubForm?: boolean;
  hideFooter?: boolean;
  isDependencyLoading?: boolean;
}

const WrappedForm = <TVariables extends FieldValues, TData, TError = unknown>(
  props: WrappedFormProps<TVariables, TData, TError>,
) => {
  const {
    handleClose,
    isAutoCloseDisable,
    useFormMethods,
    mutation,
    hideFooter,
    children,
    isDependencyLoading,
    disableSubmitButton = false,
  } = props;
  const { handleSubmit } = useFormMethods; // Use the useFormMethods object here
  const onClose = () => {
    if (handleClose) handleClose();
  };

  const onSubmit = (data: TVariables) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success(props.createSuccessText || 'Success');
        if (!isAutoCloseDisable) onClose();
      },
    });
  };

  return (
    <form
      onSubmit={(e: React.SyntheticEvent) => {
        try {
          e.stopPropagation();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return handleSubmit(onSubmit as any)(e);
        } catch (ex) {
          console.log('Exception on form', ex);
        }
      }}
      autoComplete="off"
      style={{ width: '100%' }}
    >
      <Grid
        container
        spacing={1}
        pl={0.5}
        pr={2.5}
        sx={{ overflowY: 'auto', maxHeight: '500px' }}
      >
        {children}
      </Grid>
      <Grid container spacing={1} pl={0.5}>
        <Grid item xs={12}>
          <Typography color="red">
            {extractServerValidationError(mutation?.error)}
          </Typography>
        </Grid>

        {!hideFooter && (
          <Grid item xs={12} padding={3} justifyContent="cneter">
            <SubmitButton
              title={props.submitButtonLabel || 'Submit'}
              isSubmitting={isDependencyLoading || mutation.isPending}
              disableSubmitButton={disableSubmitButton}
            />
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default WrappedForm;
