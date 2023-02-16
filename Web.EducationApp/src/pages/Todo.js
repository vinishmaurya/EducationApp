import Breadcrumb from "../core/components/breadcrumb/Breadcrumb";

const pageTitle = "Todo";
const breadcrumb = [{ href: "/", label: "Todo", current: true }];

const Todo = () => {
  return (
    <>
      <h2 className="page-title">{pageTitle}</h2>
      <Breadcrumb navItems={breadcrumb} />
    </>
  );
};

export default Todo;
