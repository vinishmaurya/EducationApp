//import axios from "axios";
//import AuthService from "../services/auth.services";
//import UFContext from "../context/UFContext";
import React from "react";

import Breadcrumb from "../core/components/breadcrumb/Breadcrumb";
import MstAccount from "../pages/super-admin/setup/masters/mst-account/MstAccount";
import MstForm from "../pages/super-admin/setup/masters/mst-form/MstForm";
import MstUser from "../pages/super-admin/setup/masters/mst-user/MstUser";
import MstRole from "../pages/super-admin/setup/masters/mst-role/MstRole";
import MapFormAccount from "../pages/super-admin/setup/masters-mapping/MapFormAccount";
import MapUserAccount from "../pages/super-admin/setup/masters-mapping/MapUserAccount";
import MapFormRole from "../pages/super-admin/setup/masters-mapping/MapFormRole";
import AdminDashboard from "../pages/organization/AdminDashboard";
import AcadAdminDashboard from "../pages/organization/academics/dashboard/AcadAdminDashboard";
import AcadParentDashboard from "../pages/organization/academics/dashboard/AcadParentDashboard";
import AcadStudentDashboard from "../pages/organization/academics/dashboard/AcadStudentDashboard";
import AcadTeacherDashboard from "../pages/organization/academics/dashboard/AcadTeacherDashboard";
import AcadMstSetupMedium from "../pages/organization/academics/setup/masters/MstSetupMedium/AcadMstSetupMedium";
import AcadMstSetupSection from "../pages/organization/academics/setup/masters/MstSetupSection/AcadMstSetupSection";
import AcadMstSetupSubject from "../pages/organization/academics/setup/masters/MstSetupSubject/AcadMstSetupSubject";
import AcadMstSetupClass from "../pages/organization/academics/setup/masters/MstSetupClass/AcadMstSetupClass";
//Acedmic Master Mapings 
import AcadMapClassSubject from "../pages/organization/academics/setup/masters-mapping/AcadMapClassSubject";
import AcadMapClassTeacher from "../pages/organization/academics/setup/masters-mapping/AcadMapClassTeacher";
import AcadMapSubjectTeacher from "../pages/organization/academics/setup/masters-mapping/AcadMapSubjectTeacher";
import AcadMapStudentClass from "../pages/organization/academics/setup/masters-mapping/AcadMapStudentClass";
import AcadMapStudentPromote from "../pages/organization/academics/setup/masters-mapping/AcadMapStudentPromote";
//Student
import AcadStudentDetails from "../pages/organization/academics/master/student/AcadStudentDetails";
import AcadMstSetupStudentCategory from "../pages/organization/academics/setup/masters/MstSetupStudentCategory/AcadMstSetupStudentCategory";
import AcadMstStudentAssignment from "../pages/organization/academics/master/AcadMstStudentAssignment";
//Teacher
import AcadTeacherDetails from "../pages/organization/academics/master/teacher/AcadTeacherDetails";
//Parent
import AcadParentDetails from "../pages/organization/academics/master/parent/AcadParentDetails";
//Time Table
import AcadTimeTableDetails from "../pages/organization/academics/master/timeTable/AcadTimeTableDetails";
//Holiday
import AcadMstHoliday from "../pages/organization/academics/master/AcadMstHoliday";
//Announcement
import AcadAnnouncement from "../pages/organization/academics/AcadAnnouncement";
//Exam
import AcadMstExam from "../pages/organization/academics/master/AcadMstExam";
//Time Table
import AcadMstSetupSession from "../pages/organization/academics/setup/masters/MstSetupSession/AcadMstSetupSession";
//System Settings
import OrgMobileAppSetting from "../pages/super-admin/setup/settings/OrgMobileAppSetting";
import OrgWebAppGeneralSetting from "../pages/super-admin/setup/settings/OrgWebAppGeneralSetting";
import OrgAppLanguageSetting from "../pages/super-admin/setup/settings/OrgAppLanguageSetting";
import OrgAppEmailConfigSetting from "../pages/super-admin/setup/settings/OrgAppEmailConfigSetting";
import OrgWebSiteContentSetup from "../pages/super-admin/setup/website/OrgWebSiteContentSetup";
import MstCountry from "./super-admin/setup/masters/mst-country/MstCountry";
import MstState from "./super-admin/setup/masters/mst-state/MstState";
import MstCity from "./super-admin/setup/masters/mst-city/MstCity";

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
                        //#region Admin Setup Component Randering
                        if (data.component === "MstAccount") {
                            return <MstAccount data={data} />
                        }
                        else if (data.component === "MstForm") {
                            return <MstForm data={data} />
                        }
                        else if (data.component === "MstUser") {
                            return <MstUser data={data} />
                        }
                        else if (data.component === "MstRole") {
                            return <MstRole data={data} />
                        }
                        else if (data.component === "MstCountry") {
                            return <MstCountry data={data} />
                        }
                        else if (data.component === "MstState") {
                            return <MstState data={data} />
                        }
                        else if (data.component === "MstCity") {
                            return <MstCity data={data} />
                        }
                        else if (data.component === "MapFormAccount") {
                            return <MapFormAccount data={data} />
                        }
                        else if (data.component === "MapUserAccount") {
                            return <MapUserAccount data={data} />
                        }
                        else if (data.component === "MapFormRole") {
                            return <MapFormRole data={data} />
                        }
                        else if (data.component === "AdminDashboard") {
                            return <AdminDashboard data={data} />
                        }
                        //#endregion
                        else if (data.component === "AcadAdminDashboard") {
                            return <AcadAdminDashboard data={data} />
                        }
                        else if (data.component === "AcadParentDashboard") {
                            return <AcadParentDashboard data={data} />
                        }
                        else if (data.component === "AcadStudentDashboard") {
                            return <AcadStudentDashboard data={data} />
                        }
                        else if (data.component === "AcadTeacherDashboard") {
                            return <AcadTeacherDashboard data= { data } />
                        }
                        else if (data.component === "AcadMstSetupMedium") {
                            return <AcadMstSetupMedium data={data} />
                        }
                        else if (data.component === "AcadMstSetupSection") {
                            return <AcadMstSetupSection data={data} />
                        }
                        else if (data.component === "AcadMstSetupSubject") {
                            return <AcadMstSetupSubject data={data} />
                        }
                        else if (data.component === "AcadMstSetupClass") {
                            return <AcadMstSetupClass data={data} />
                        }
                        else if (data.component === "AcadMapClassSubject") {
                            return <AcadMapClassSubject data={data} />
                        }
                        else if (data.component === "AcadMapClassTeacher") {
                            return <AcadMapClassTeacher data={data} />
                        }
                        else if (data.component === "AcadMapClassSubject") {
                            return <AcadMapClassTeacher data= { data } />
                        }
                        else if (data.component === "AcadMapSubjectTeacher") {
                            return <AcadMapSubjectTeacher data={data} />
                        }
                        else if (data.component === "AcadMapStudentClass") {
                            return <AcadMapStudentClass data= { data } />
                        }
                        else if (data.component === "AcadMapStudentPromote") {
                            return <AcadMapStudentPromote data={data} />
                        }
                        else if (data.component === "AcadStudentDetails") {
                            return <AcadStudentDetails data={data} />
                        }
                        else if (data.component === "AcadMstSetupStudentCategory") {
                            return <AcadMstSetupStudentCategory data={data} />
                        }
                        else if (data.component === "AcadMstStudentAssignment") {
                            return <AcadMstStudentAssignment data={data} />
                        }
                        else if (data.component === "AcadTeacherDetails") {
                            return <AcadTeacherDetails data={data} />
                        }
                        else if (data.component === "AcadParentDetails") {
                            return <AcadParentDetails data={data} />
                        }
                        else if (data.component === "AcadTimeTableDetails") {
                            return <AcadTimeTableDetails data={data} />
                        }
                        else if (data.component === "AcadMstHoliday") {
                            return <AcadMstHoliday data={data} />
                        }
                        else if (data.component === "AcadAnnouncement") {
                            return <AcadAnnouncement data={data} />
                        }
                        else if (data.component === "AcadMstExam") {
                            return <AcadMstExam data={data} />
                        }
                        else if (data.component === "AcadMstSetupSession") {
                            return <AcadMstSetupSession data={data} />
                        }
                        else if (data.component === "OrgMobileAppSetting") {
                            return <OrgMobileAppSetting data={data} />
                        }
                        else if (data.component === "OrgWebAppGeneralSetting") {
                            return <OrgWebAppGeneralSetting data={data} />
                        }
                        else if (data.component === "OrgAppLanguageSetting") {
                            return <OrgAppLanguageSetting data={data} />
                        }
                        else if (data.component === "OrgAppEmailConfigSetting") {
                            return <OrgAppEmailConfigSetting data={data} />
                        }
                        else if (data.component === "OrgWebSiteContentSetup") {
                            return <OrgWebSiteContentSetup data={data} />
                        }
                        

                        
                    })()}
                </div>
            </div>
        </>
    );
};

export default SharedComponent;
