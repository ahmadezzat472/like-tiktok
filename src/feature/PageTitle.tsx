import { useModalContext } from "@/context/ModalContextDef";

interface Props {
  title: string;
  subTitle: string;
}
const PageTitle = ({ subTitle, title }: Props) => {
  const { isModalOpen } = useModalContext();

  if (isModalOpen) return null;
  return (
    <div className="absolute bottom-[30px] left-[25px] z-20">
      <h2 className="text-xl font-semibold text-white capitalize">{title}</h2>
      <h3 className="text-white">{subTitle}</h3>
    </div>
  );
};

export default PageTitle;
