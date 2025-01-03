import { useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export const CopyTextButton = ({onClick, children, ...props}: ButtonProps) => {
  const [showDoneIcon, setShowDoneIcon] = useState(false);

  const handleClick: typeof onClick = (event) => {
    onClick?.(event);

    // Show visual indication of successful operation for 2 seconds
    setShowDoneIcon(true);
    setTimeout(() => setShowDoneIcon(false), 2000);
  };

  return <Button
    {...props}
    onClick={handleClick}
    endIcon={showDoneIcon ? <CheckIcon /> : <ContentCopyIcon />}
  >
    {children}
  </Button>;
};
