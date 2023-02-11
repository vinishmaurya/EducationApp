import KotaBreadcrumb from "../core/components/breadcrumb/KotaBreadcrumb";
import MstAccount from "../pages/super-admin/setup/masters/mst-account/MstAccount";
import MstForm from "../pages/super-admin/setup/masters/mst-form/MstForm";
import MstUser from "../pages/super-admin/setup/masters/mst-user/MstUser";
import MstRole from "../pages/super-admin/setup/masters/mst-role/MstRole";
import MapFormCompany from "../pages/super-admin/setup/masters-mapping/MapFormCompany";
import MapFormRole from "../pages/super-admin/setup/masters-mapping/MapFormRole";
import AcadAdminDashboard from "../pages/organization/academics/dashboard/AcadAdminDashboard";
import AcadParentDashboard from "../pages/organization/academics/dashboard/AcadParentDashboard";
import AcadStudentDashboard from "../pages/organization/academics/dashboard/AcadStudentDashboard";
import AcadTeacherDashboard from "../pages/organization/academics/dashboard/AcadTeacherDashboard";
const SharedComponent = ({ data }) => {
    const pageTitle = data.title;
    const breadcrumb = [{ href: "/", label: pageTitle, current: true }];
    //const DynamicComponent = React.lazy(() => import('../pages/super-admin/setup/masters/MstAccount'));
    //console.log(data.landingPage);
    return (
        <>
            <h3 className="page-title">{pageTitle}</h3>
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
                        if (data.component == "MstAccount") {
                            return <MstAccount data={data} />
                        }
                        else if (data.component == "MstForm") {
                            return <MstForm data={data} />
                        }
                        else if (data.component == "MstUser") {
                            return <MstUser data={data} />
                        }
                        else if (data.component == "MstRole") {
                            return <MstRole data={data} />
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
