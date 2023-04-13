// @ts-nocheck
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Business from "./accounts/business/Business";
import Settlement from "./accounts/settlement/Settlement";
import Styles from "./styles.module.scss";
import Subsidiaries from "./accounts/subsidiary/Subsidiaries";
import { HeaderTab } from "@/interfaces";
import Router, { useRouter } from "next/router";

interface Props {
  routes: HeaderTab[];
}

const TabHeader = ({ routes }: Props) => {
  const [activeTab, setActiveTab] = useState("");

  const { asPath } = useRouter();

  useEffect(() => {
    setActiveTab(asPath);
  }, [asPath]);

  return (
    <div className={Styles.header__container}>
      <nav>
        <ul>
          {routes?.map((route) => (
            <li
              key={route?.id}
              onClick={() => Router.push(route?.link)}
              className={activeTab === route?.link ? Styles.active : ""}
            >
              {route?.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TabHeader;
