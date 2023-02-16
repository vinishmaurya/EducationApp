import Breadcrumb from "../core/components/breadcrumb/Breadcrumb";

const pageTitle = "Blank Page";
const breadcrumb = [{ href: "/", label: "Blank Page", current: true }];

const Blank = () => {
    return (
        <>
            <h2 className="page-title">{pageTitle}</h2>
            <Breadcrumb navItems={breadcrumb} />
        </>
    );
};

export default Blank;
