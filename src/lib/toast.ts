import { initToast } from "@ryfylke-react/toast";
import React from "react";

export type Toast = {
  title: string;
  kind?: "success" | "error" | "warning" | "info";
};

export const {
  toast: _toast,
  useToasts,
  ToastProvider,
} = typeof document !== "undefined"
  ? initToast<Toast>()
  : ({
      // server patch
      toast: () => {},
      useToasts: () => ({
        toasts: [],
        cancelToastTimeout: () => {},
        restartToastTimeout: () => {},
        onRemoveToast: () => {},
      }),
      ToastProvider: ({
        children,
      }: {
        children: React.ReactNode;
      }) => React.createElement(React.Fragment, {}, children),
    } as unknown as ReturnType<typeof initToast<Toast>>);

export const toast = (
  toast: Toast & {
    removeAfterMs?: number;
  }
) => {
  _toast({ removeAfterMs: 3000, kind: "info", ...toast });
};
