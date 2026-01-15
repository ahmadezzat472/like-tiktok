const Logo = () => {
  const isZRoute = location.pathname.startsWith("/z");
  const logoSrc = isZRoute
    ? "/icons/logo_a_1410x480.svg"
    : "/icons/logo_b_1410x480.svg";
  return (
    <div className="absolute top-[25px] left-[25px] w-[121px] h-[41px] z-30">
      <img
        src={logoSrc}
        className="max-w-full max-h-full min-w-full min-h-full"
        alt="logo like-tiktok"
      />
    </div>
  );
};

export default Logo;
