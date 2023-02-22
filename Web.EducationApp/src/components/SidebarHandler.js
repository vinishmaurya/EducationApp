import { useContext, useEffect, useRef } from "react";
import UFContext from "../context/UFContext";
import Sidebar from "../core/components/sidebar/Sidebar";
//import menuItems from "../data/sidebar.json";
import { useNavigate } from "react-router-dom";

const SidebarHandler = (prop) => {
    
    let menuItems = prop.menuItems;
    
    return (
        <Sidebar menuItems={menuItems} autoActiveMenu={true} />
    )    
};

export default SidebarHandler;
