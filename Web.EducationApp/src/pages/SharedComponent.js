import Breadcrumb from "../core/components/breadcrumb/Breadcrumb";
import MstAccount from "../pages/super-admin/setup/masters/mst-account/MstAccount";
import MstForm from "../pages/super-admin/setup/masters/mst-form/MstForm";
import MstUser from "../pages/super-admin/setup/masters/mst-user/MstUser";
import MstRole from "../pages/super-admin/setup/masters/mst-role/MstRole";
import MapFormAccount from "../pages/super-admin/setup/masters-mapping/MapFormAccount";
import MapUserAccount from "../pages/super-admin/setup/masters-mapping/MapUserAccount";
import MapFormRole from "../pages/super-admin/setup/masters-mapping/MapFormRole";
import AcadAdminDashboard from "../pages/organization/academics/dashboard/AcadAdminDashboard";
import AcadParentDashboard from "../pages/organization/academics/dashboard/AcadParentDashboard";
import AcadStudentDashboard from "../pages/organization/academics/dashboard/AcadStudentDashboard";
import AcadTeacherDashboard from "../pages/organization/academics/dashboard/AcadTeacherDashboard";
import AcadMstSetupMedium from "../pages/organization/academics/setup/masters/AcadMstSetupMedium";
import AcadMstSetupSection from "../pages/organization/academics/setup/masters/AcadMstSetupSection";
import AcadMstSetupSubject from "../pages/organization/academics/setup/masters/AcadMstSetupSubject";
import AcadMstSetupClass from "../pages/organization/academics/setup/masters/AcadMstSetupClass";
//Acedmic Master Mapings 
import AcadMapClassSubject from "../pages/organization/academics/setup/masters-mapping/AcadMapClassSubject";
import AcadMapClassTeacher from "../pages/organization/academics/setup/masters-mapping/AcadMapClassTeacher";
import AcadMapSubjectTeacher from "../pages/organization/academics/setup/masters-mapping/AcadMapSubjectTeacher";
import AcadMapStudentClass from "../pages/organization/academics/setup/masters-mapping/AcadMapStudentClass";
import AcadMapStudentPromote from "../pages/organization/academics/setup/masters-mapping/AcadMapStudentPromote";

const SharedComponent = ({ data }) => {
    const pageTitle = data.title;
    const breadcrumb = [{ href: "/", label: pageTitle, current: true }];
    //const DynamicComponent = React.lazy(() => import('../pages/super-admin/setup/masters/MstAccount'));
    //console.log(data.landingPage);
    return (
        <>
            <h5 className="page-title">{pageTitle}</h5>
            <Breadcrumb navItems={breadcrumb} />
            
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
                        else if (data.component == "MapFormAccount") {
                            return <MapFormAccount />
                        }
                        else if (data.component == "MapUserAccount") {
                            return <MapUserAccount />
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
                        else if (data.component == "AcadMstSetupMedium") {
                            return <AcadMstSetupMedium />
                        }
                        else if (data.component == "AcadMstSetupSection") {
                            return <AcadMstSetupSection />
                        }
                        else if (data.component == "AcadMstSetupSubject") {
                            return <AcadMstSetupSubject />
                        }
                        else if (data.component == "AcadMstSetupClass") {
                            return <AcadMstSetupClass />
                        }
                        else if (data.component == "AcadMapClassSubject") {
                            return <AcadMapClassSubject />
                        }
                        else if (data.component == "AcadMapClassTeacher") {
                            return <AcadMapClassTeacher />
                        }
                        else if (data.component == "AcadMapClassSubject") {
                            return <AcadMapClassTeacher />
                        }
                        else if (data.component == "AcadMapSubjectTeacher") {
                            return <AcadMapSubjectTeacher />
                        }
                        else if (data.component == "AcadMapStudentClass") {
                            return <AcadMapStudentClass />
                        }
                        else if (data.component == "AcadMapStudentPromote") {
                            return <AcadMapStudentPromote />
                        }
                    })()}
                </div>
            </div>
        </>
    );
};

export default SharedComponent;
