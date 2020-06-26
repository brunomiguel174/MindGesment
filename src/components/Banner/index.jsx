import React, { useEffect, useLayoutEffect } from "react";

import "./styles.css";

// O Banner é um componente que serve para mostrar uma mensagem ao user do estado
// do que foi executado
// Returna uma mensagem
export default function Banner({ bannerMessage, setBannerMessage }) {
  useEffect(() => {
    setTimeout(() => setBannerMessage(""), 4000);
  }, [bannerMessage]);

  let divBanner;
  useLayoutEffect(() => {
    divBanner = document.getElementsByClassName("div--banner")[0];
    if (!divBanner) return;
    if (bannerMessage) {
      divBanner.style.top = "120px";
      divBanner.style.visibility = "visible";
    } else {
      divBanner.style.top = "-120px";
      divBanner.style.visibility = "hidden";
    }
  }, [bannerMessage]);

  if (bannerMessage)
    return (
      <>
        <div className="div--banner">
          <div className="alertDiv">
            <div> {bannerMessage} </div>
          </div>
        </div>
      </>
    );
  else return null;
}
