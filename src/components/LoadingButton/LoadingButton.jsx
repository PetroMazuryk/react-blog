import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({
  isLoading,
  isEditing,
  onClick,
  size,
  variant,
  editText,
  publishText,
}) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : isEditing ? (
        editText || "Редагувати"
      ) : (
        publishText || "Опублікувати"
      )}
    </Button>
  );
};

export default LoadingButton;
