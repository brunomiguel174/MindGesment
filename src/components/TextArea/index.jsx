import React from "react";

import "./style.css";

// TextArea retorna o elemento TextArea

export default function TextArea({
  children,
  label,
  error,
  errorMessage,
  className,
  type,
  ...res
}) {
  return (
    <label className={`TextAreaContainer ${className}`} htmlFor={res.id}>
      {label && <p className="LabelMesage">{label}</p>}
      <div>
        <textarea {...res}>{children}</textarea>
      </div>
      {error && <p className="errorMessage">{errorMessage}</p>}
    </label>
  );
}
