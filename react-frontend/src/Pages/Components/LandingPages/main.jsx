// src/Components/LandingPages/Main.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../FeatureCard";
import ProtectIcon from "/src/assets/images/mdi_shield-outline.png";
import Love from "/src/assets/images/icon-park_oval-love-two.png";
import Community from "/src/assets/images/fluent_people-community-16-filled.png";
import tag1 from "/src/assets/images/tag1.png";
import tag2 from "/src/assets/images/tag2.png";
import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun2.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun4.png";
import Leaf5 from "/src/assets/images/daun5.png";
import Leaf6 from "/src/assets/images/daun6.png";

export default function Main() {
  const navigate = useNavigate();

  return (
    <main className="relative bg-background text-darkText font-serif py-12 overflow-hidden">
      {/* Leaf Decorations */}
      <img src={Leaf1} alt="Leaf 1" className="hidden sm:block absolute w-[60px] sm:w-[104px] top-[30px] left-[20px] rotate-[1deg] z-0" />
      <img src={Leaf2} alt="Leaf 2" className="hidden sm:block absolute w-[70px] sm:w-[140px] top-[180px] left-[10px] rotate-[-125deg] z-0" />
      <img src={Leaf3} alt="Leaf 3" className="hidden sm:block absolute w-[70px] sm:w-[140px] top-[30px] right-[20px] rotate-[125deg] z-0" />
      <img src={Leaf4} alt="Leaf 4" className="hidden sm:block absolute w-[60px] sm:w-[104px] top-[240px] right-[25px] rotate-[-5deg] z-0" />
      <img src={Leaf5} alt="Leaf 5" className="hidden sm:block absolute w-[60px] sm:w-[104px] top-[520px] left-[25px] rotate-[-7deg] z-0" />
      <img src={Leaf6} alt="Leaf 6" className="hidden sm:block absolute w-[80px] sm:w-[155px] top-[540px] right-[35px] rotate-[-15deg] z-0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Tombol Aksi */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-[52px] mb-16">
          <button
            onClick={() => navigate("/share")}
            className="w-full md:w-[357px] h-[44px] px-[28px] py-[10px] bg-primary rounded-[10px] text-white font-abhaya flex items-center justify-center gap-[20px]"
          >
            Share Your Story Anonymously
            <img src={tag1} alt="Tag Icon" className="w-5 h-5" />
          </button>

          <button className="w-full md:w-[201px] h-[44px] bg-background text-primary rounded-[10px] shadow-md font-abhaya flex items-center justify-center gap-2">
            Read Stories
            <img src={tag2} alt="Tag Icon" className="w-5 h-5" />
          </button>
        </div>

        {/* Section Cards */}
        <section className="flex flex-wrap justify-center gap-[54px] max-w-[876px] mx-auto">
          <FeatureCard
            icon={ProtectIcon}
            title="Completely Anonymous"
            description="No accounts, no tracking, no personal data. Your privacy is absolute and your identity is protected."
            className="w-[256px] h-[243px]"
          />
          <FeatureCard
            icon={Love}
            title="Trauma-Informed"
            description="Designed with care and sensitivity. Every feature prioritizes your emotional safety and well-being."
            className="w-[256px] h-[243px]"
          />
          <FeatureCard
            icon={Community}
            title="Supportive Community"
            description="Connect through shared experiences. No pressure to engage - simply witness and be witnessed."
            className="w-[256px] h-[243px]"
          />
        </section>

        {/* Safety Box */}
        <div className="mt-16 w-full flex justify-center">
          <div
            className="bg-orange-gradient text-darkText rounded-[14px] px-[36px] py-[25px] w-full max-w-[788px]"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            <h2 className="text-center font-bold text-lg mb-3">Your Safety Matters</h2>
            <p className="font-abhaya text-[16px] leading-[100%] font-[400] mb-4">
              This platform is designed to be a safe space for sharing difficult experiences. All stories are reviewed by
              trained moderators before being published to ensure community safety and support.
            </p>
            <p className="font-abhaya text-[16px] leading-[100%] font-[400] mb-4">
              <strong>If you're in immediate danger:</strong> Please contact emergency services or reach out to a crisis
              helpline immediately.
            </p>
            <div className="bg-background text-sm py-2 px-4 rounded font-abhaya flex justify-start gap-4 flex-wrap sm:flex-nowrap">
              <span className=" font-abhaya whitespace-nowrap">
                <strong>Crisis Text Line:</strong> Text HOME to 741741
              </span>
              <span className="font-abhaya whitespace-nowrap">
                <strong>National Suicide Prevention Lifeline:</strong> 988
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
