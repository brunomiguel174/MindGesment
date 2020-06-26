import React, { useState } from "react";
import { connect } from "react-redux";
import { FiEdit, FiChevronDown } from "react-icons/fi";

import "./styles.css";

// Tips apresenta a lista de todas as tips na home
function Tips({ items = [], isAdmin, deleteTip, setSelectedTip, ref }) {
  function showDescription(index) {
    let container = document.getElementsByClassName("container-description")[
      index
    ];
    let chevron = document.getElementsByClassName("chevron")[index];

    if (container.style.display === "none" || container.style.display === "") {
      container.style.display = "flex";
      chevron.classList.add("rotation");
    } else {
      container.style.display = "none";
      chevron.classList.remove("rotation");
    }
  }
  return (
    <ul className="container-tips">
      {items.map((value, index) => {
        return (
          <>
            <li key={value.id}>
              {isAdmin ? (
                <>
                  <button
                    className="button-delete"
                    onClick={() => deleteTip(value.id)}
                  >
                    x
                  </button>

                  <button
                    className="button-edit"
                    onClick={() => setSelectedTip(value)}
                  >
                    <FiEdit />
                  </button>
                </>
              ) : null}

              <article>
                <div className="header" onClick={() => showDescription(index)}>
                  <div></div>
                  <div>
                    <h4>{value.title}</h4>
                    <div className="chevron">
                      <FiChevronDown />
                    </div>
                  </div>
                </div>
              </article>
            </li>

            <div className="container-description">
              <img src={value.imageUrl} alt={value.imageUrl} />
              <p>{value.description}</p>
            </div>
          </>
        );
      })}
    </ul>
  );
}

const mapStateToProps = state => ({
  isAdmin: state.user.details.isAdmin
});

export default connect(mapStateToProps, undefined)(Tips);
