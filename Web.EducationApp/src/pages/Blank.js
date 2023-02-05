import KotaBreadcrumb from "../core/components/breadcrumb/KotaBreadcrumb";

const pageTitle = "Blank Page";
const breadcrumb = [{ href: "/", label: "Blank Page", current: true }];

const Blank = () => {
    return (
        <>
            <h2 className="page-title">{pageTitle}</h2>
            <KotaBreadcrumb navItems={breadcrumb} />
        </>
    );
};

export default Blank;
