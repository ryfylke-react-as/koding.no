import React from "react";

export type CheckItem = {
  id: string;
  label: string;
};

export const CheckItem = ({ id, label }: CheckItem) => {
  const [checked, setChecked] = React.useState(
    localStorage.getItem(id) === "true"
  );
  const onChange = () => {
    setChecked(!checked);
    localStorage.setItem(id, (!checked).toString());
  };
  return (
    <label
      className="row"
      style={{ gap: "0.25rem" }}
      title="Marker som gjort"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
