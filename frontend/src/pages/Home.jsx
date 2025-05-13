import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import DealOfDaySection from "../components/DealOfDaySection";
import TopStoresSection from "../components/TopStoresSection";
import CategoriesSection from "../components/CategoriesSection";
import VariousCategorySection from "../components/VariousCategorySection";

function Home() {


  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      <main className="flex-grow">
        <HeroBanner />
      </main>
      <DealOfDaySection />
      <TopStoresSection />
      <CategoriesSection  />
      <VariousCategorySection  />
    </div>
  );
}

export default Home;
