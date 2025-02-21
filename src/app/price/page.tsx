"use client";
import React, { useEffect } from "react";
import TablePricing from "@/components/TablePricing";

const PricePage: React.FC = () => {
  //  scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TablePricing />
    </>
  );
};

export default PricePage;
