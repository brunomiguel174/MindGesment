import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

import "./style.css";


// Returna um label, um imput e um erro costumisado para componente pai
export default function Input({
  label,
  error,
  errorMessage,
  className,
  type,
  ...res
}) {
  const [isHide, setIsHide] = useState(true);

  return (
    <label className={`InputContainer ${className}`} htmlFor={res.id}>
      {label && <p className="LabelMesage">{label}</p>}
      <div>
        <input
          type={type === "password" ? (isHide ? "password" : "text") : type}
          {...res}
        />
        {type === "password" && (
          <button
            type="button"
            tabIndex="-1"
            onClick={() => setIsHide(!isHide)}
          >
            <FaEye color={"Black"} size={16} />
          </button>
        )}
      </div>
      {error && <p className="errorMessage">{errorMessage}</p>}
    </label>
  );
}
