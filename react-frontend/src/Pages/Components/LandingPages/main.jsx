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
    <main className="relative bg-background text-darkText font-abhaya py-12 overflow-hidden">
      <img
        src={Leaf1}
        alt=""
        aria-hidden
        className="pointer-events-none select-none hidden md:block absolute z-0
                   w-[clamp(48px,9vw,104px)] top-[clamp(16px,4vw,30px)]
                   left-[clamp(8px,3vw,20px)] rotate-[1deg]"
      />
      <img
        src={Leaf2}
        alt=""
        aria-hidden
        className="pointer-events-none select-none hidden lg:block absolute z-0
                   w-[clamp(56px,12vw,140px)] top-[clamp(120px,22vw,240px)]
                   left-[clamp(6px,2vw,10px)] -rotate-[125deg]"
      />
      <img
        src={Leaf3}
        alt=""
        aria-hidden
        className="pointer-events-none select-none hidden md:block absolute z-0
                   w-[clamp(56px,12vw,140px)] top-[clamp(18px,4vw,30px)]
                   right-[clamp(10px,3.5vw,20px)] rotate-[125deg]"
      />
      <img
        src={Leaf4}
        alt=""
        aria-hidden
        className="pointer-events-none select-none hidden xl:block absolute z-0
                   w-[clamp(48px,9vw,104px)] top-[clamp(160px,30vw,240px)]
                   right-[clamp(12px,4vw,25px)] -rotate-[5deg]"
      />
      <img
        src={Leaf5}
        alt=""
        aria-hidden
        className="pointer-events-none select-none hidden lg:block absolute z-0
                   w-[clamp(48px,9vw,104px)] top-[clamp(320px,45vw,520px)]
                   left-[clamp(12px,3.5vw,25px)] -rotate-[7deg]"
      />
      <img
        src={Leaf6}
        alt=""
        aria-hidden
        className="pointer-events-none select-none hidden xl:block absolute z-0
                   w-[clamp(60px,14vw,155px)] top-[clamp(340px,47vw,540px)]
                   right-[clamp(14px,4vw,35px)] -rotate-[15deg]"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-[20px] mb-12">
          <button
            onClick={() => navigate("/share")}
            className="w-full md:w-[357px] h-[44px] px-[28px] rounded-[10px]
                       bg-[#D96F32] text-white font-abhaya flex items-center justify-center gap-[14px]
                       shadow-brand hover:opacity-95"
          >
            Share Your Story Anonymously
            <img src={tag1} alt="" className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => navigate("/comment")}
            className="w-full md:w-[201px] h-[44px] rounded-[10px]
                       border border-brand-700 text-brand-700 bg-transparent
                       font-abhaya flex items-center justify-center gap-2 hover:bg-brand-700/10"
          >
            Read Stories
            <img src={tag2} alt="" className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[36px] max-w-[980px] mx-auto">
          <FeatureCard
            icon={ProtectIcon}
            title="Completely Anonymous"
            description="No accounts, no tracking, no personal data. Your privacy is absolute and your identity is protected."
            className="bg-background border border-brand-700/10 shadow-card
                       transform-gpu origin-center transition-transform duration-300 ease-out
                       hover:scale-[1.03] hover:-translate-y-1"
          />
          <FeatureCard
            icon={Love}
            title="Trauma-Informed"
            description="Designed with care and sensitivity. Every feature prioritizes your emotional safety and well-being."
            className="bg-background border border-brand-700/10 shadow-card
                       transform-gpu origin-center transition-transform duration-300 ease-out
                       hover:scale-[1.03] hover:-translate-y-1"
          />
          <FeatureCard
            icon={Community}
            title="Supportive Community"
            description="Connect through shared experiences. No pressure to engage - simply witness and be witnessed."
            className="bg-background border border-brand-700/10 shadow-card
                       transform-gpu origin-center transition-transform duration-300 ease-out
                       hover:scale-[1.03] hover:-translate-y-1"
          />
        </section>

        <div className="mt-16 w-full flex justify-center">
          <div className="group w-full max-w-[900px]">
            <div
              className="
                bg-brand-orange-90
                text-darkText rounded-[14px] px-[28px] md:px-[36px] py-[22px] md:py-[26px]
                shadow-card transform-gpu transition-transform duration-300 ease-out
                hover:scale-[1.04] hover:-translate-y-1 hover:shadow-lift
              "
            >
              <h2 className="text-center font-aboreto text-[20px] md:text-[22px] mb-3">
                Your Safety Matters
              </h2>

              <p className="text-[15px] leading-[1.5] mb-2 text-darkText/90">
                This platform is designed to be a safe space for sharing difficult experiences. All stories are
                reviewed by trained moderators before being published to ensure community safety and support.
              </p>

              <p className="text-[15px] leading-[1.5] mb-4 text-darkText/90">
                <strong>If you're in immediate danger:</strong> Please contact emergency services or reach out to a
                crisis helpline immediately.
              </p>

              <div
                className="
                  bg-background rounded-[8px] text-sm py-2 px-4 font-abhaya
                  flex justify-between gap-4 flex-wrap
                  transform-gpu transition-transform duration-300 ease-out
                  group-hover:scale-[1.02]
                "
              >
                <span className="whitespace-nowrap">
                  <strong>Crisis Text Line:</strong> Text HOME to 741741
                </span>
                <span className="whitespace-nowrap">
                  <strong>National Suicide Prevention Lifeline:</strong> 988
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
