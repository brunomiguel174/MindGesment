import React from "react";
import { connect } from "react-redux";

import "./styles.css";

// Quando as informações estiverem a ser carregas o Loading
function Loading({ isLoading }) {
  if (!isLoading) return null;
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loadingio-spinner-ellipsis-475nev26tij">
          <div className="ldio-ddchek80mi">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

export default connect(mapStateToProps)(Loading);
