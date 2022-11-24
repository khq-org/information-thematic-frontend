import React from "react";
import { Link } from "react-router-dom";
import {
  CNavItem,
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const logout = () => {
  localStorage.removeItem("access_token");
};

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          size="md"
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Tài khoản
        </CDropdownHeader>

        <Link to="/info">
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Thông tin
          </CDropdownItem>
        </Link>

        <Link to="/info">
          <CDropdownItem>
            <CIcon icon={cilBell} className="me-2" />
            Cập nhật
          </CDropdownItem>
        </Link>

        <Link to="/changepw">
          <CDropdownItem>
            <CIcon icon={cilLockLocked} className="me-2" />
            Mật khẩu
          </CDropdownItem>
        </Link>

        <CDropdownDivider />
        <CDropdownItem onClick={logout} href="/">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
