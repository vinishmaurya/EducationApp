import React, { useEffect } from 'react';
import Content from "../core/components/content/Content";
import Footer from "../core/components/footer/Footer";
import SidebarHandler from "./SidebarHandler";
//import { useContext, useState, useRef } from "react";
//import UFContext from "../context/UFContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavbarHandler from "./NavbarHandler";

const AdminLayout = ({ children, prop }) => {
    const [UserInfo, setUserInfo] = React.useState([]);
    const location = useLocation();
    //console.log(location);
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state === null) {
            //alert('AdminL');
            return navigate('/auth/login');
        }
        let menuItems = [];
        
        let result = location.state.SideBar;
        let LoggedInUserRoleId = result.Data.userInfo.RoleId;
        if (result) {
            let formRoleMappingInfo = result.Data.formRoleMappingInfo;
            if (formRoleMappingInfo.length > 0) {
                menuItems.push({ label: formRoleMappingInfo[0].RoleName });
                var filteredParentForm = formRoleMappingInfo.filter(function (obj) {
                    return (obj.ParentId === "0");
                });
                var filteredChiledForm = formRoleMappingInfo.filter(function (obj) {
                    return (obj.ParentId !== "0");
                });
                for (var i = 0; i < filteredParentForm.length; i++) {
                    let child = [];
                    for (var j = 0; j < filteredChiledForm.length; j++) {
                        if (filteredChiledForm[j].ParentId === filteredParentForm[i].PK_FormId) {
                            let href = filteredChiledForm[j].SPA_ComponentHref ? filteredChiledForm[j].SPA_ComponentHref : (filteredChiledForm[j].ControllerName + "/" + filteredChiledForm[j].ActionName);
                            //console.log("test = " + href);
                            child.push(
                                {
                                    label: filteredChiledForm[j].FormName,
                                    href: href,
                                    icon: filteredChiledForm[j].ClassName
                                });
                        }
                    }
                    menuItems.push({ label: filteredParentForm[i].FormName, icon: filteredParentForm[i].ClassName, child: child });
                }
                
            }
        }
        //debugger;
        if (Number(LoggedInUserRoleId) === 1) {
            menuItems.push({
                "label": "MAIN MENU"
            },
                {
                    "href": "/dashboard",
                    "label": "Dashboard",
                    "icon": "chart-line"
                },
                {
                    "href": "/chat",
                    "label": "Chat",
                    "icon": "comment"
                },
                {
                    "href": "/mail",
                    "label": "Mail",
                    "icon": "envelope",
                    "badge": {
                        "label": 8,
                        "colorTheme": "success"
                    }
                },
                {
                    "href": "/e-commerce",
                    "label": "E-Commerce",
                    "icon": "shopping-cart"
                },
                {
                    "href": "/calendar",
                    "label": "Calendar",
                    "icon": "calendar",
                    "badge": {
                        "label": 10,
                        "colorTheme": "danger"
                    }
                },
                {
                    "label": "COMPONENTS"
                },
                {
                    "label": "General",
                    "icon": "info-circle",
                    "child": [
                        {
                            "href": "/vinish",
                            "label": "Vinish Test"
                        },
                        {
                            "href": "/components/buttons",
                            "label": "Buttons"
                        },
                        {
                            "href": "/components/button-group",
                            "label": "Button group"
                        },
                        {
                            "href": "/components/typography",
                            "label": "Typography"
                        }
                    ]
                },
                {
                    "label": "Navigation",
                    "icon": "compass",
                    "child": [
                        {
                            "href": "/components/breadcrumb",
                            "label": "Breadcrumb"
                        },
                        {
                            "href": "/components/dropdowns",
                            "label": "Dropdowns"
                        },
                        {
                            "href": "/components/pagination",
                            "label": "Pagination"
                        }
                    ]
                },
                {
                    "label": "Data Entry",
                    "icon": "edit",
                    "child": [
                        {
                            "href": "/components/form-control",
                            "label": "Form Control"
                        },
                        {
                            "href": "/components/select",
                            "label": "Select"
                        },
                        {
                            "href": "/components/checks-radios",
                            "label": "Checks & Radios"
                        },
                        {
                            "href": "/components/range",
                            "label": "Range"
                        },
                        {
                            "href": "/components/input-group",
                            "label": "Input Group"
                        },
                        {
                            "href": "/components/floating-labels",
                            "label": "Floating Labels"
                        },
                        {
                            "href": "/components/layout",
                            "label": "Layout"
                        },
                        {
                            "href": "/components/validation",
                            "label": "Validations"
                        }
                    ]
                },
                {
                    "label": "Data Display",
                    "icon": "tv",
                    "child": [
                        {
                            "href": "/components/badge",
                            "label": "Badge"
                        },
                        {
                            "href": "/components/card",
                            "label": "Card"
                        },
                        {
                            "href": "/components/carousel",
                            "label": "Carousel"
                        },
                        {
                            "href": "/components/collapse",
                            "label": "Collapse"
                        },
                        {
                            "href": "/components/navs",
                            "label": "Navs"
                        },
                        {
                            "href": "/components/popovers",
                            "label": "Popovers"
                        },
                        {
                            "href": "/components/tooltips",
                            "label": "Tooltips"
                        },
                        {
                            "href": "/components/list-group",
                            "label": "List group"
                        },
                        {
                            "href": "/components/accordion",
                            "label": "Accordion"
                        }
                    ]
                },
                {
                    "label": "Feedback",
                    "icon": "comments",
                    "child": [
                        {
                            "href": "/components/alerts",
                            "label": "Alerts"
                        },
                        {
                            "href": "/components/modal",
                            "label": "Modal"
                        },
                        {
                            "href": "/components/progress",
                            "label": "Progress"
                        },
                        {
                            "href": "/components/spinners",
                            "label": "Spinners"
                        },
                        {
                            "href": "/components/toasts",
                            "label": "Toasts"
                        },
                        {
                            "href": "/components/placeholders",
                            "label": "Placeholders"
                        }
                    ]
                },
                {
                    "label": "Other",
                    "icon": "toolbox",
                    "child": [
                        {
                            "href": "/components/media-object",
                            "label": "Media Object"
                        },
                        {
                            "href": "/components/scrollspy",
                            "label": "Scrollspy"
                        }
                    ]
                },
                {
                    "label": "Charts",
                    "icon": "chart-pie",
                    "child": [
                        {
                            "href": "/components/apex",
                            "label": "Apex"
                        },
                        {
                            "href": "/components/chartjs",
                            "label": "Chartjs"
                        }
                    ]
                },
                {
                    "label": "Maps",
                    "icon": "map-marker-alt",
                    "child": [
                        {
                            "href": "/components/google-maps",
                            "label": "Google Maps"
                        },
                        {
                            "href": "/components/open-street-maps",
                            "label": "Open Street Maps"
                        }
                    ]
                },
                {
                    "label": "PAGES"
                },
                {
                    "label": "Pages",
                    "icon": "file",
                    "child": [
                        {
                            "href": "/pages/blank",
                            "label": "Blank Page"
                        },
                        {
                            "href": "/pages/profile",
                            "label": "Profile"
                        },
                        {
                            "href": "/pages/user-list",
                            "label": "User List"
                        },
                        {
                            "href": "/pages/invoice",
                            "label": "Invoice"
                        },
                        {
                            "href": "/pages/pricing",
                            "label": "Pricing"
                        },
                        {
                            "href": "/pages/faq",
                            "label": "Faq"
                        },
                        {
                            "href": "/pages/setting",
                            "label": "Setting"
                        }
                    ]
                },
                {
                    "label": "Errors",
                    "icon": "exclamation-circle",
                    "child": [
                        {
                            "href": "/pages/error-404",
                            "label": "Error 404"
                        },
                        {
                            "href": "/pages/error-500",
                            "label": "Error 500"
                        }
                    ]
                },
                {
                    "label": "Authentication",
                    "icon": "exclamation-circle",
                    "child": [
                        {
                            "href": "/auth/login",
                            "label": "Login"
                        },
                        {
                            "href": "/auth/register",
                            "label": "Register"
                        },
                        {
                            "href": "/auth/forget-password",
                            "label": "Forget Password"
                        }
                    ]
                },
                {
                    "label": "Documentation"
                },
                {
                    "href": "http://www.google.com",
                    "externalLink": true,
                    "label": "Documentation",
                    "icon": "book"
                });
        }
        setUserInfo(menuItems);

    }, []);



    return (
        <div className="main">
            <NavbarHandler />
            <div className="page-wrapper">
                <SidebarHandler menuItems={UserInfo} />
                <Content>
                    {children}
                    <Footer />
                </Content>
            </div>
        </div>
    );
};

export default AdminLayout;
