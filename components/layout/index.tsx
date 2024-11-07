import React, { ReactElement } from "react";
import Footer from "./footer";
import Header from "../header";

interface Props {
  headLess?: boolean;
  footLess?: boolean;
  mobileHeadLess?: boolean;
  mobileFootLess?: boolean;
  children: ReactElement;
}

const Layout: React.FC<Props> = ({
  children,
  headLess = false,
  footLess = false,
  mobileHeadLess = false,
  mobileFootLess = false,
}) => {
  return (
    <div>
      {!headLess && (
        <div className="hidden lg:block">
          <Header />
        </div>
      )}
      {!mobileHeadLess && (
        <div className="lg:hidden">
          <Header />
        </div>
      )}
      <div className="min-h-[calc(100vh-216px)]">{children}</div>
      {!footLess && (
        <div className="hidden lg:block">
          <Footer />
        </div>
      )}
      {!mobileFootLess && (
        <div className="lg:hidden">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
