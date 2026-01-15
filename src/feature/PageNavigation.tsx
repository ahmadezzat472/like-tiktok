import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Page } from "../types";
import { useModalContext } from "@/context/ModalContextDef";

interface Props {
  pages: Page[];
}

const PageNavigation = ({ pages }: Props) => {
  const { isModalOpen } = useModalContext();
  const [isMenuEnlarged, setIsMenuEnlarged] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const isZRoute = location.pathname.startsWith("/z");

  const minimizedPages = pages.length
    ? [
        { title: pages[0].title, id: pages[0].id }, // Antipasti
        { title: "pizza", id: "-1" }, // Special case: toggles menu
        { title: pages[8].title, id: pages[8].id }, // Pinsa
        { title: pages[9].title, id: pages[9].id }, // Pasta / Lasagne
        { title: pages[10].title, id: pages[10].id }, // Dessert
      ]
    : [];

  const enlargedPages = pages.map((page) => ({
    title: page.title,
    id: page.id,
  }));

  const currentPages = isMenuEnlarged ? enlargedPages : minimizedPages;

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuEnlarged(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when info modal opens
  useEffect(() => {
    if (isModalOpen) {
      setIsMenuEnlarged(false);
    }
  }, [isModalOpen]);

  // Handle menu item click
  const handleMenuItemClick = (title: string, id: string) => {
    if (title.toLowerCase() === "pizza" && !isMenuEnlarged) {
      setIsMenuEnlarged(true);
    } else if (
      title.toLowerCase() === pages[1].title.toLowerCase() &&
      isMenuEnlarged
    ) {
      setIsMenuEnlarged(false);
    } else if (id !== "-1") {
      setIsMenuEnlarged(false);
    }
  };

  return (
    <div
      ref={menuRef}
      className={`absolute top-5 right-5 bg-white rounded-[26px] z-40 w-[182px] transition-all duration-300 overflow-hidden ${
        isMenuEnlarged ? "h-[572px]" : "h-[260px]"
      }`}
    >
      <ul className={`transition-all duration-300  py-[1px]`}>
        {currentPages.map(({ title, id }, index) => (
          <React.Fragment key={title + id}>
            <li>
              <Link
                to={id !== "-1" ? `${isZRoute ? "z" : "d"}/page/${id}` : "#"}
                onClick={() => handleMenuItemClick(title, id)}
                className="w-full flex justify-between gap-1 items-center px-[16px] h-[50px] transition-all duration-300"
              >
                <span className="flex-1 truncate font-semibold capitalize">
                  {title}
                </span>
                <img
                  src="/icons/icon_right_arrow.svg"
                  alt="right arrow icon"
                  className="w-4 h-4"
                />
              </Link>
            </li>
            {index < currentPages.length - 1 && (
              <div className="h-[2px] w-[150px] bg-[#E5E5E5] mx-auto"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default PageNavigation;
