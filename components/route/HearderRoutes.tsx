import React from "react";
import Styles from "./styles.module.scss";
import Addbox from "../../public/assets/images/add-box-line.svg";
import LeftArrow from "../../public/assets/images/arrow-left.svg";
import Logo from "../../public/assets/images/mlogo.svg";
import { useRouter } from "next/router";

interface headerRouteProps {
  btnTitle: string | number;
  routeName: string | number;
}

const HeaderRoutes = ({ btnTitle, routeName }: headerRouteProps) => {
  // const navigation =
  const router = useRouter();
  const handleGoback = () => {
    router.back();
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <LeftArrow onClick={() => handleGoback} />
        <Logo />
        <p>{routeName}</p>
      </div>
      <div className={Styles.right}>
        <button>
          {btnTitle} <Addbox className={Styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default HeaderRoutes;
