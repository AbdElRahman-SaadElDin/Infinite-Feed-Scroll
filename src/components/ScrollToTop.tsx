import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// make sure when moves between tabs it start from first scrollbar
const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
