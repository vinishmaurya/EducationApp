//import { useContext } from "react";
//import UFContext from "../context/UFContext";
import logo from "../assets/images/full-logo.jpeg";
import DropdownNotification from "../core/components/dropdown/DropdownNotification";
import Navbar from "../core/components/navbar/Navbar";
//import usFlag from "../assets/images/usa-50.png";
//import profilePic from "../assets/images/portrait.png";
import {
  faBell,
  //faCalendar,
  //faCog,
  faEdit,
  //faEnvelope,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import sidebarMenu from "../data/sidebar.json";

const title = "EducationSystem";

const funcLogout = () => {

    //cookieStore.getAll().then(cookies => cookies.forEach(cookie => {
    //    console.log('Cookie deleted:', cookie);
    //    cookieStore.delete(cookie.name);
    //}));
    //console.log(document.cookie);

    // retrieve all cookies
    var Cookies = document.cookie.split(';');
    // set past expiry to all cookies
    for (var i = 0; i < Cookies.length; i++) {
        document.cookie = Cookies[i] + "=; expires=" + new Date(0).toUTCString();
    }
    localStorage.clear();
    window.location.href = '/auth/login';
    //const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
    //const navigate = useNavigate();


    //let token_expires = new Date();
    //setCookie('accessToken', "", { path: '/', token_expires });

    //let refreshToken_expires = new Date();
    //setCookie('refreshToken', "", { path: '/', refreshToken_expires });

    //setTimeout(() => {
    //    navigate('/');
    //}, 100);

    //try {
    //    AuthService.Logout().then(
    //        (response) => {
    //            console.log('logout');
    //        },
    //        (error) => {
    //            alert("Oops! Some error occured.");
    //        }
    //    );
    //} catch (e) {
        
    //}
}
const notifications = [
  {
    href: "#",
    label: "New message from",
    highlight: "pepe",
    dateReceived: "2021-08-14 07:16:00",
  },
  {
    href: "#",
    icon: "check-square",
    label: "Your request has ben",
    highlight: "approved",
    dateReceived: "2021-08-14 06:40:00",
  },
  {
    href: "#",
    icon: "calendar",
    label: "You have meeting with",
    highlight: "engineering",
    dateReceived: "2021-08-14 06:35:00",
  },
];

const menuItems = [
  //{
  //  type: "dropdown",
  //  image: {
  //    src: usFlag,
  //    alt: "Translation",
  //  },
  //  label: "EN",
  //  dropdown: [
  //    { href: "/", label: "English" },
  //    { href: "/", label: "Bahasa" },
  //  ],
  //},
  //{
  //  type: "link",
  //  href: "/",
  //  icon: faCalendar,
  //  tooltip: "Calendar",
  //},
  //{
  //  type: "link",
  //  href: "/",
  //  icon: faEnvelope,
  //  tooltip: "Mail",
  //},
  {
    type: "dropdown",
    href: "/",
    icon: faBell,
    //color: "danger",
    dropdownContent: (
      <DropdownNotification
        header="100+ New Notificaions"
        items={notifications}
        viewAllCallback={() => console.log("view all")}
        clearAllCallback={() => console.log("clear all")}
      />
    ),
  },
  {
    type: "dropdown",
    icon: faUser,

    //image: {
    //  src: profilePic,
    //  alt: "profile",
    //  className: "profile",
    //},
    label: "Profile",
    dropdown: [
      { href: "/", icon: faEdit, label: "Profile" },
      {
        href: "/auth/login",
        icon: faSignOutAlt,
        label: "Logout",
        onClick: funcLogout,
      },
    ],
  },
  //{
  //  type: "link",
  //  href: "/",
  //  icon: faCog,
  //  tooltip: "Settings",
  //},
];


const filterMenu = (menus) => {
  let newList = [];
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (menu.href) {
      newList.push({
        href: menu.href,
        label: menu.label,
      });
    }
    if (menu.child) {
      newList = newList.concat(filterMenu(menu.child));
    }
  }
  return newList;
};

const components = filterMenu(sidebarMenu);

const handleSearchBar = (e) => {
  const word = e.target.value;
  let searchList = components.filter((value) => {
    const label = value.label.toLowerCase().replace(/\s/, "");
    const searchWord = word.toLowerCase().replace(/\s/, "");
    return label.includes(searchWord);
  });
  if (searchList.length > 6) {
    searchList = searchList.slice(0, 5);
  }
  return searchList;
};

const NavbarHandler = (props) => {
    
    //const myContext = useContext(UFContext);
    //console.log();
    //myContext.GetUserInfo().then(function (result) {
    //    // here you can use the result of promise
    //    console.log(result);
    //});
    return(
        <Navbar
            menuItems={menuItems}
            onSearch={handleSearchBar}
            searchlabel="Search components"
            srcLogo={logo}
            title={title}
        />
    );
};

export default NavbarHandler;
