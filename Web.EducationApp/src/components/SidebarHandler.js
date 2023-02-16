import Sidebar from "../core/components/sidebar/Sidebar";
import menuItems from "../data/sidebar.json";

const SidebarHandler = () => (
  <Sidebar menuItems={menuItems} autoActiveMenu={true} />
);

export default SidebarHandler;
