import React from "react";
import { useToasts } from "@site/src/lib/toast";
import styles from "./ToastList.module.scss";
import clsx from "clsx";

const kindToIcon = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "i",
};

const kindToClassname = {
  success: "button--success",
  error: "button--danger",
  warning: "button--warning",
  info: "button--info",
};

export const ToastList = () => {
  const utils = useToasts();

  return (
    <ul className={styles.toastList}>
      {utils.toasts.map((toast) => (
        <li key={toast.id}>
          <button
            title="Klikk for å fjerne"
            className={clsx(
              "button",
              "button--secondary",
              kindToClassname[toast.kind],
              "button--lg",
              "button--outline"
            )}
            onMouseEnter={() =>
              toast.removeAfterMs
                ? utils.cancelToastTimeout(toast.id)
                : noop
            }
            onMouseLeave={() =>
              toast.removeAfterMs
                ? utils.restartToastTimeout(toast.id)
                : noop
            }
            onClick={() => utils.onRemoveToast(toast.id)}
          >
            <span>{kindToIcon[toast.kind]}</span>
            {toast.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

function noop() {}
