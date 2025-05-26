
import { useState, useEffect } from "react";
import { toast as sonnerToast } from "sonner";

// Simplified toast hook that uses sonner instead of the complex state management
export const useToast = () => {
  return {
    toast: (props: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      if (props.variant === "destructive") {
        sonnerToast.error(props.title || props.description || "Error");
      } else {
        sonnerToast.success(props.title || props.description || "Success");
      }
    },
    dismiss: () => {
      sonnerToast.dismiss();
    }
  };
};

export const toast = (props: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}) => {
  if (props.variant === "destructive") {
    sonnerToast.error(props.title || props.description || "Error");
  } else {
    sonnerToast.success(props.title || props.description || "Success");
  }
};
