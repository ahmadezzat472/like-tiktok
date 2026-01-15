import { useEffect, useRef } from "react";
import { Variant } from "../types";
import { useModalContext } from "@/context/ModalContextDef";

interface Props {
  description: string;
  title: string;
  variante: Variant[];
}

const PageDetailsModal = ({ description, title, variante }: Props) => {
  const { isModalOpen, setIsModalOpen } = useModalContext();

  const variantsWithoutSvg = variante?.filter((v) => !v.svg) || [];
  const variantsWithSvg = variante?.filter((v) => v.svg) || [];
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalElement = document.querySelector(".modal-class");
      if (
        isModalOpen &&
        modalElement &&
        !modalElement.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".page-details-button")
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, setIsModalOpen]);

  return (
    <div
      ref={modalRef}
      className={`
        modal-class pt-3.5 px-[15px] w-full text-start ${
          isModalOpen ? "animate-model-text" : "hidden"
        }
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <div className=" h-full animate-plus-icon">
        <h1 className="text-xl font-semibold capitalize">{title}</h1>
        <p className="mb-[15px] mt-[10px] leading-[19px]">{description}</p>

        {/* First Row: Variants without SVG */}
        {variantsWithoutSvg.length > 0 && (
          <div
            className="grid gap-[15px] mb-[22px]"
            style={{
              gridTemplateColumns: `repeat(${variantsWithoutSvg.length}, minmax(60px, 1fr))`,
            }}
          >
            {variantsWithoutSvg.map((variant, index) => (
              <div key={variant.id} className="flex">
                <div
                  className={`relative flex flex-col items-right w-[calc(100%-2px)]`}
                >
                  <p className="leading-[19px]">
                    {variant.title} <br /> {variant.subTitle}
                  </p>
                </div>

                {index != variantsWithoutSvg.length - 1 && (
                  <div className="w-[2px] h-[31px] bg-[#E5E5E5] mt-1"></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Second Row: Variants with SVG */}
        {variantsWithSvg.length > 0 && (
          <div
            className="grid gap-[15px]"
            style={{
              gridTemplateColumns: `repeat(${variantsWithSvg.length}, minmax(60px, 1fr))`,
            }}
          >
            {variantsWithSvg.map((variant, index) => (
              <div key={variant.id} className="flex">
                <div
                  className={`relative flex flex-col items-right w-[calc(100%-2px)]`}
                >
                  {variant.svg && (
                    <img
                      src={variant.svg}
                      alt="Variant"
                      className="w-[52px] h-[52px] mb-[10px]"
                    />
                  )}
                  <p className="leading-[19px]">
                    {variant.title} <br /> {variant.subTitle}
                  </p>
                </div>
                {index != variantsWithSvg.length - 1 && (
                  <div className="w-[2px] h-[96px] bg-[#E5E5E5] mt-1"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailsModal;
