import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    splash: {
      bg: string;
      gradient: string;
      logoFill: string;
      progressBg: string;
      progressAfterBg: string;
      titleColor: string;
      subTitleColor: string;
      iconColor: string;
    };
    layout: {
      bg: string;
      contentBoxShadowColor: string;
    };
    sidebar: {
      borderColor: string;
      iconColor: string;
      headerBg: string;
      contactContainerBg: string;
      contactColor: string;
      contactIconColor: string;
    };
    search: {
      iconColor: string;
      textColor: string;
      containerColor: string;
    };
    options: {
      bg: string;
      boxShadow: string;
      hoverColor: string;
      textColor: string;
    };
    unselectedChat: {
      bg: string;
    };
    chatRoom: {
      bg: string;
      footerBg: string;
      scrollBtnBoxShadow: string;
      scrollBtnColor: string;
      sectionBg: string;
      profileBg: string;
      profileBoxShadow: string;
      profileHeadingColor: string;
      profileDividerColor: string;
      profileActionColor: string;
    };
    common: {
      containerColor: string;
      titleColor: string;
      subTitleColor: string;
      readTickColor: string;
      notificationBg: string;
      infoAlertBg: string;
      borderColor: string;
    };
  }
}