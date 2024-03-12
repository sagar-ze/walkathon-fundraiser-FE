import React from 'react';
import { Grid, Typography } from '@mui/material';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import SubmitButton from '../WrappedButtons/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const extractServerValidationError = (error: any) => {
  return get(error, 'response.data.error.message');
};

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
  redirectTo?: string;
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
    redirectTo,
    disableSubmitButton = false,
  } = props;
  const navigate = useNavigate();
  const { handleSubmit } = useFormMethods; // Use the useFormMethods object here
  const onClose = () => {
    if (handleClose) handleClose();
  };

  const onSubmit = (data: TVariables) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success(props.createSuccessText || 'Success');
        if (!isAutoCloseDisable) onClose();
        if (redirectTo) {
          navigate(redirectTo);
        }
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
      <Grid container spacing={1} pl={0.5} pr={2.5} sx={{ overflowY: 'auto' }}>
        {children}
      </Grid>
      <Grid container spacing={1} pl={0.5}>
        <Grid item xs={12}>
          <Typography color="red">
            {mutation.isError && extractServerValidationError(mutation?.error)}
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
