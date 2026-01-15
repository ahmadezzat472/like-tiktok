import { useAnimationContext } from "@/context/AnimationContextDef";
import { useModalContext } from "@/context/ModalContextDef";
import PageDetailsModal from "./PageDetailsModal";
import { Variant } from "@/types";
import { useLanguageContext } from "@/context/LanguageContextDef";

interface Props {
  triggerButton: boolean;
  description: string;
  title: string;
  variante: Variant[];
}

const PlusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M166.5,76.5h-63V13.5c0-7.46-6.04-13.5-13.5-13.5h0c-7.46,0-13.5,6.04-13.5,13.5v63H13.5c-7.46,0-13.5,6.04-13.5,13.5h0c0,7.46,6.04,13.5,13.5,13.5h63v63c0,7.46,6.04,13.5,13.5,13.5h0c7.46,0,13.5-6.04,13.5-13.5v-63h63c7.46,0,13.5-6.04,13.5-13.5h0c0-7.46-6.04-13.5-13.5-13.5Z"
      fill="currentColor"
    />
  </svg>
);

const PageDetailsButton = ({
  triggerButton,
  description,
  title,
  variante,
}: Props) => {
  const { isModalOpen, setIsModalOpen } = useModalContext();
  const { triggerPulse } = useAnimationContext();
  const { language } = useLanguageContext();  

  if (!triggerButton) {
    return null;
  }
  if (triggerPulse === false)
    return (
      <button
        className={`page-details-button  absolute bottom-5 rounded-[26px] right-5 flex flex-col  items-end justify-between z-30 bg-white transition-all  ${
          isModalOpen ? "w-[341px] h-[341px]" : "w-[98px] h-[52px]"
        }`}
        style={{
          transition: isModalOpen
            ? "width 0.333s ease, height 0.333s ease 0.333s"
            : "width 0.333s ease 0.333s, height 0.333s ease",
        }}
      >
        <PageDetailsModal
          description={description}
          title={title}
          variante={variante}
        />

        {/* White dot/circle that expands into the button */}
        <div
          onClick={() => setIsModalOpen(!isModalOpen)}
          className={`rounded-[26px] bg-white flex gap-2 px-2 items-center justify-end absolute bottom-0 right-0 w-[98px] h-[52px]`}
        >
          {/* Text */}
          <span
            className={`font-bold text-black transition-all duration-300 ${
              isModalOpen ? "animate-toggle-text" : ""
            } `}
          >
            {isModalOpen ? (language == "en" ? "Close" : "Verstanden") : "Info"}
          </span>

          {/* Black circle with plus icon */}
          <div
            className={`rounded-full min-w-[36px] min-h-[36px] w-[36px] h-[36px] flex items-center justify-center bg-black transition-all duration-300 ${
              isModalOpen ? "rotate-[45deg]" : "rotate-0"
            }`}
          >
            <div
              className={`text-white transition-all duration-300 translate-x-[.2px] translate-y-[0.2px]`}
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      </button>
    );
};

export default PageDetailsButton;
