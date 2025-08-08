import React, { useState } from "react";
import LogoIcon from "/src/assets/images/uil_image-upload.png";
import ShieldIcon from "/src/assets/images/shield.png";

export default function MainShare() {
  const [story, setStory] = useState("");

  return (
    <main className="font-abhaya">
      {/* Privacy Box */}
      <div className="bg-completeprivacy text-darkText rounded-[10px] px-6 py-4 mb-6 shadow-md max-w-[95%] mx-auto">
        <div className="flex items-start gap-3">
          <img src={ShieldIcon} alt="Shield Icon" className="w-5 h-5 mt-1" />
          <p className="text-[16px] leading-tight">
            <strong>Complete Privacy:</strong> No account required, no tracking, no personal data collected. Your story will be anonymous and any metadata will be automatically removed.
          </p>
        </div>
      </div>

      {/* Story Input Area */}
      <div className="bg-gradient-to-r from-[#F8B259] to-[#D96F32] text-darkText rounded-[10px] shadow-md p-4 max-w-[95%] mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[24px] font-bold">Your anonymous story</h2>
          <button className="bg-[#E77941] text-white text-sm px-4 py-1 rounded flex items-center gap-1">
            <img src={LogoIcon} alt="Upload Icon" className="w-4 h-4" />
            Image
          </button>
        </div>

        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows="10"
          className="w-full bg-background rounded-md p-3 text-sm font-serif resize-none"
          placeholder="Start typing your story..."
          maxLength={5000}
        />

        <div className="flex justify-between text-sm text-darkText mt-2">
          <span>{story.length}/5000 characters</span>
          <span>Stories are reviewed before publication</span>
        </div>
      </div>

      {/* Submit Warning */}
      <p className="text-sm text-darkText flex items-center gap-2 mt-3 ml-4">
        <span>📝</span> Please write at least 10 characters to submit your story
      </p>

      {/* Review Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-[#E3B69A] text-white px-6 py-2 rounded-md text-lg font-abhaya"
          disabled={story.length < 10}
        >
          Review & Submit
        </button>
      </div>
    </main>
  );
}
