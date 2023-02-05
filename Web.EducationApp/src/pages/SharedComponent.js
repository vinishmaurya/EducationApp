import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KotaBreadcrumb from "../core/components/breadcrumb/KotaBreadcrumb";
import MstCompany from "../pages/super-admin/setup/masters/MstCompany";
import MstForm from "../pages/super-admin/setup/masters/MstForm";
import MstUser from "../pages/super-admin/setup/masters/MstUser";
import MstRole from "../pages/super-admin/setup/masters/MstRole";
import MapFormCompany from "../pages/super-admin/setup/masters-mapping/MapFormCompany";
import MapFormRole from "../pages/super-admin/setup/masters-mapping/MapFormRole";
import AcadAdminDashboard from "../pages/organization/academics/dashboard/AcadAdminDashboard";
import AcadParentDashboard from "../pages/organization/academics/dashboard/AcadParentDashboard";
import AcadStudentDashboard from "../pages/organization/academics/dashboard/AcadStudentDashboard";
import AcadTeacherDashboard from "../pages/organization/academics/dashboard/AcadTeacherDashboard";
const SharedComponent = ({ data }) => {
    const pageTitle = data.title;
    const breadcrumb = [{ href: "/", label: pageTitle, current: true }];
    //const DynamicComponent = React.lazy(() => import('../pages/super-admin/setup/masters/MstCompany'));
    //console.log(data.component);
    return (
        <>
            <h2 className="page-title">{pageTitle}</h2>
            <KotaBreadcrumb navItems={breadcrumb} />
            <div className="row">
                <div className="col">

                    {
                        //<Suspense fallback={<div>Loading...</div>}>
                        //    <DynamicComponent />
                        //</Suspense>
                    }

                    {(() => {
                        //console.log(data);
                        if (data.component == "MstCompany") {
                            return <MstCompany />
                        }
                        else if (data.component == "MstForm") {
                            return <MstForm />
                        }
                        else if (data.component == "MstUser") {
                            return <MstUser />
                        }
                        else if (data.component == "MstRole") {
                            return <MstRole />
                        }
                        else if (data.component == "MapFormCompany") {
                            return <MapFormCompany />
                        }
                        else if (data.component == "MapFormRole") {
                            return <MapFormRole />
                        }
                        else if (data.component == "AcadAdminDashboard") {
                            return <AcadAdminDashboard />
                        }
                        else if (data.component == "AcadParentDashboard") {
                            return <AcadParentDashboard />
                        }
                        else if (data.component == "AcadStudentDashboard") {
                            return <AcadStudentDashboard />
                        }
                        else if (data.component == "AcadTeacherDashboard") {
                            return <AcadTeacherDashboard />
                        }
                    })()}
                </div>
            </div>
        </>
    );
};

export default SharedComponent;
