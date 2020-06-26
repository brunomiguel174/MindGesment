import React, { useState, useEffect } from "react";

import Banner from "../Banner";
import Input from "../../components/Input";

// Componente atualmente sem utilização
// Mas tem o objetivo do utilizador poder 
// modificar as mensalidades das antigas wish
export default function WishRangeComp({
  othersWishes,
  setOthersWishes,
  wishProposalAmount = 1
}) {
  const [maxTotalProposal, setMaxTotalProposal] = useState(0);
  const [bannerMessage, setBannerMessage] = useState("");

  useEffect(() => {
    setMaxTotalProposal(
      othersWishes.reduce((acc, cur) => {
        return acc + cur.proposalAmount;
      }, 0)
    );
  }, []);

  return (
    <>
      <Banner
        bannerMessage={bannerMessage}
        setBannerMessage={setBannerMessage}
      />
      <ul>
        {console.log("render")}
        {othersWishes.map((value, index) => {
          const { id, name, proposalAmount, total } = value;
          return (
            <li key={id}>
              <Input
                label={`${name}: (${proposalAmount}) / ${wishProposalAmount - maxTotalProposal > total
                  ? total
                  : wishProposalAmount - maxTotalProposal}`}
                type="number"
                title={name}
                min="1"
                max={wishProposalAmount - maxTotalProposal > total
                  ? total
                  : wishProposalAmount - maxTotalProposal}
                onChange={event => {
                  const cur = event.target.valueAsNumber;
                  setOthersWishes(prev => {
                    prev[index] = { ...prev[index], proposalAmount: cur };
                    return prev;
                  });
                  setMaxTotalProposal(prev => prev + cur - proposalAmount);
                }}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
