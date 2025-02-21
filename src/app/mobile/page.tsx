import React from "react";
import ServicesMobileSection from "@/components/ServiceMobileSection";
import MobileCard from "@/components/MobileCard";
import WhyAppSection from "@/components/WhyAppSection";
import ProcessAppSection from "@/components/ProcessAppSection";
import QuoteRequestForm from "@/components/QuoteRequestForm";
const MobilePage: React.FC = () => {
  return (
    <>
      <ServicesMobileSection />
      <MobileCard />
      <WhyAppSection />
      <ProcessAppSection />
      <QuoteRequestForm />
    </>
  );
};

export default MobilePage;
