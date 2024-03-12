import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDialogProps {
  buttonVariant?: 'outlined' | 'contained' | 'text';
  deleteButtonLabel?: React.ReactNode;
  confirmButtonLabel?: React.ReactNode;
  buttonColor?:
    | 'inherit'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning';
  cancelButtonLabel?: React.ReactElement;
  primaryText?: string | null;
  secondaryText?: string;
  onConfirm: () => void;
  onOpen?: () => void;
  isLoading?: boolean;
  disableConfirmButton?: boolean;
  type?: 'icon' | 'button';
  sx?: SxProps<Theme> | undefined;
  iconEL?: React.ReactElement | 'none';
  hideConfirmEl?: () => boolean;
  hide?: boolean;
  disabled?: boolean;
  iconSize?: 'small' | 'inherit' | 'medium' | 'large';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const {
    deleteButtonLabel,
    onOpen,
    confirmButtonLabel,
    iconEL,
    cancelButtonLabel,
    primaryText,
    secondaryText,
    isLoading,
    buttonColor = 'error',
    buttonVariant = 'contained',
    onConfirm,
    hideConfirmEl,
    disableConfirmButton,
    type,
    sx,
    hide,
    disabled,
    iconSize,
  } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (hideConfirmEl && hideConfirmEl()) {
      if (!disabled) onConfirm();
      return;
    }
    setOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };
  if (hide) return <></>;

  return (
    <React.Fragment>
      {type === 'icon' ? (
        <IconButton onClick={handleClickOpen} disabled={disabled}>
          <DeleteOutlinedIcon color="error" fontSize={iconSize || 'medium'} />
        </IconButton>
      ) : typeof deleteButtonLabel === 'string' ? (
        <Button
          disabled={disabled}
          variant={buttonVariant || 'text'}
          color={buttonColor}
          className="default-button"
          onClick={handleClickOpen}
          startIcon={
            iconEL === 'none' ? '' : iconEL ? iconEL : <DeleteOutlinedIcon />
          }
          sx={{ textTransform: 'none', ...(sx || {}) }}
        >
          {deleteButtonLabel}
        </Button>
      ) : (
        <span
          onClick={handleClickOpen}
          style={{
            cursor: disabled ? 'none' : 'pointer',
            pointerEvents: disabled ? 'none' : 'auto',
          }}
        >
          {deleteButtonLabel}
        </span>
      )}
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} marginBottom={2}>
            {deleteButtonLabel && typeof deleteButtonLabel !== 'string' ? (
              ''
            ) : (
              <WarningAmberIcon color="error" fontSize="large" />
            )}
            <Typography className="header-text">{primaryText}</Typography>
          </Stack>
          <DialogContentText fontSize="12px">{secondaryText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="default-button"
            color="primary"
            disabled={isLoading}
          >
            {cancelButtonLabel}
          </Button>
          <Button
            onClick={handleConfirm}
            className="default-button"
            color="error"
            disabled={disableConfirmButton}
          >
            {confirmButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmDialog;
