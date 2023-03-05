import { faCheck, faSave, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

import Button, { ButtonProps } from './';

type SaveButtonProps = {
  saving: boolean;
  errored: boolean;
  saved: boolean;
} & ButtonProps;

const SaveButton = ({ saving, errored, saved, children, ...props }: SaveButtonProps) => {
  const icon = useMemo(() => {
    if (errored) {
      return faTimes;
    }
    if (saving) {
      return faSpinner;
    }
    if (saved) {
      return faCheck;
    }

    return faSave
  }, [errored, saving, saved])

  return (
    <Button {...props}>
      <FontAwesomeIcon
        icon={icon}
        className="mr-2 inline"
        height={20}
        width={20}
        spinPulse={icon === faSpinner} />
      {children}
    </Button>
  )
}

export default SaveButton;