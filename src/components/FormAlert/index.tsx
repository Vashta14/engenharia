import React from "react";
import { Alert } from "react-bootstrap";
import {
  BsFillCheckCircleFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";

type AlertProps = {
  variant: "success" | "danger" | "warning";
  show?: boolean;
  onClose: () => void;
  dismissible?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function FormAlert({
  variant,
  show = false,
  onClose,
  dismissible,
  children,
}: AlertProps) {
  return (
    <Alert
      variant={variant}
      show={show}
      onClose={onClose}
      dismissible={dismissible}
      className="alert-dismissible fade"
    >
      {variant === "success" ? (
        <BsFillCheckCircleFill className=" mx-1" />
      ) : (
        <BsFillExclamationTriangleFill className=" mx-1" />
      )}
      {children}
    </Alert>
  );
}
