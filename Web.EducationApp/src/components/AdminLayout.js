import Content from "../core/components/content/Content";
import Footer from "../core/components/footer/Footer";
import SidebarHandler from "./SidebarHandler";
import NavbarHandler from "./NavbarHandler";

const AdminLayout = ({ children }) => {
  return (
    <div className="main">
      <NavbarHandler />
      <div className="page-wrapper">
        <SidebarHandler />
        <Content>
          {children}
          <Footer />
        </Content>
      </div>
    </div>
  );
};

export default AdminLayout;
