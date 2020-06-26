import React from "react";
import { FiEdit } from "react-icons/fi";
import { connect } from "react-redux";

import coinFormat from "../../utils/coinFormat";

// o TicketEx recebe um array de tickets
// em que vão ser mostrados na página 
// wallet
function TicketEx({
  currency,
  item = [],
  deleteTicket,
  setSelectedTransaction
}) {
  return (
    <>
      {item.map(value => {
        return (
          <li
            key={value.id}
            className="ticket-style"
            style={{
              backgroundColor: value.type === "INCOME" ? " #61e20f" : "#F7695A"
            }}
          >
            <button
              className="button-delete"
              onClick={() => deleteTicket(value.id)}
            >
              x
            </button>
            <button
              className="button-edit"
              onClick={() => setSelectedTransaction(value)}
            >
              <FiEdit />
            </button>

            <article>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
            <article>
              <h3>
                {currency ? coinFormat(value.amount, currency) : value.amount}
              </h3>
              <p>{value.date}</p>
            </article>
          </li>
        );
      })}
    </>
  );
}

const mapStateToProps = state => ({
  currency: state.user.details.coin
});

export default connect(mapStateToProps)(TicketEx);
