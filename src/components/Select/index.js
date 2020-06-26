import React from "react";
import PropTypes from "prop-types";

import stringRefactor from "../../utils/stringRefactor";

function Select({
  onChange,
  items,
  selectedOption,
  className,
  title,
  error,
  errorMessage,
}) {
  return (
    <>
      <select
        value={selectedOption}
        onChange={onChange}
        className={`SelectContainer ${className}`}
        title={title}
      >
        <option disabled={true}>Select</option>
        {items.map((value, index) => (
          <option key={index} value={value}>
            {stringRefactor(value)}
          </option>
        ))}
      </select>
      {error && <p className="errorMessage">{errorMessage}</p>}
    </>
  );
}

export default Select;
Select.prototype = {
  onChange: PropTypes.func,
  item: PropTypes.array,
};
