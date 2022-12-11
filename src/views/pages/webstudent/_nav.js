import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavGroup,
    name: "HỌC SINH",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Học bạ",
        to: "#",
      },
      {
        component: CNavItem,
        name: "Kết quả học tập",
        to: "#",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "LỊCH HỌC VÀ THI",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Thời khóa biểu",
        to: "#",
      },
      {
        component: CNavItem,
        name: "Lịch thi",
        to: "#",
      },
    ],
  },
];

export default _nav;
