import React from "react";
import KotaBreadcrumb from "../core/components/breadcrumb/KotaBreadcrumb";
const breadcrumb = [{ href: "/", label: "Error 404", current: true }];
const pageTitle = "Page Not Found!";
const Error404 = () => {
    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-body">

                        <h2 className="page-title">{pageTitle}</h2>
                        {<KotaBreadcrumb navItems={breadcrumb} />}
                        <p>
                            Oops, looks like the page is lost. <br />
                This is not a fault, just an accident that was not intentional.
             </p>
                        
                    </div>
                </div>
            </div>
        </>
    );
};
export default Error404;
