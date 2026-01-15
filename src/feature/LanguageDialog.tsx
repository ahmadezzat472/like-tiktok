import { useLanguageContext } from "@/context/LanguageContextDef";
import animation03 from "../../public/animation/animation_03.json";
import Lottie from "lottie-react";
import { useRef, useState } from "react";

const LanguageDialog = () => {
  const lottieRef = useRef(null);
  const { isLangDialogOpen, setIsLangDialogOpen, language, setLanguage } =
    useLanguageContext();
  const [lang, setLang] = useState<"de" | "en">(language);

  const handleLang = () => {
    setIsLangDialogOpen(false);
    setLanguage(lang);
  };
  if (!isLangDialogOpen) return null;

  return (
    <div className="absolute h-[100dvh] inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]">
      <div className="absolute top-4 right-4 bottom-4 left-4 bg-white px-8 py-14 rounded-[26px]">
        {/* Language Toggle */}
        <div className="w-fit flex items-center justify-center gap-1 bg-[#8F8F8F] rounded-[26px] p-2 mb-6 mx-auto">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 rounded-[18px] font-semibold cursor-pointer ${
              lang === "en" ? "bg-white text-black" : "text-white"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("de")}
            className={`px-3 py-1.5 rounded-[18px] font-semibold cursor-pointer ${
              lang === "de" ? "bg-white text-black" : "text-white"
            }`}
          >
            Deutsch
          </button>
        </div>

        <p className="text-[20px] text-center">
          {lang == "en"
            ? "Swipe to explore the menu."
            : "Streichen, um das Menü zu entdecken."}
        </p>
      </div>

      <div className="absolute left-0 right-0 top-[55%] -translate-y-1/2">
        <div className="relative h-[360px]">
          <Lottie
            lottieRef={lottieRef}
            animationData={animation03}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />

          <button
            className="absolute top-full left-1/2 -translate-1/2 mx-auto flex justify-center items-center w-[122px] h-[52px] bg-[#00B938] text-white rounded-full font-bold cursor-pointer"
            onClick={handleLang}
          >
            {lang == "en" ? "Got It" : "Verstanden"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageDialog;
