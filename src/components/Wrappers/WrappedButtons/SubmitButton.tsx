import React from 'react';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type SubmitButtonProps = {
  isSubmitting: boolean;
  disableSubmitButton?: boolean;
  title: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { isSubmitting, title, disableSubmitButton } = props;
  return (
    <LoadingButton
      type="submit"
      fullWidth
      variant="contained"
      className="default-button"
      disabled={isSubmitting || disableSubmitButton}
      loading={isSubmitting}
    >
      {isSubmitting ? <CircularProgress size="small" /> : ''}
      {title}
    </LoadingButton>
  );
};

export default SubmitButton;
