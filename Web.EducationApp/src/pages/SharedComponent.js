import axios from "axios";
//import AuthService from "../services/auth.services";
//import UFContext from "../context/UFContext";
import React, { useState } from "react";

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
//Student
import AcadStudentDetails from "../pages/organization/academics/master/student/AcadStudentDetails";
import AcadMstSetupStudentCategory from "../pages/organization/academics/setup/masters/AcadMstSetupStudentCategory";
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
import AcadMstSetupSession from "../pages/organization/academics/setup/masters/AcadMstSetupSession";
//System Settings
import OrgMobileAppSetting from "../pages/super-admin/setup/settings/OrgMobileAppSetting";
import OrgWebAppGeneralSetting from "../pages/super-admin/setup/settings/OrgWebAppGeneralSetting";
import OrgAppLanguageSetting from "../pages/super-admin/setup/settings/OrgAppLanguageSetting";
import OrgAppEmailConfigSetting from "../pages/super-admin/setup/settings/OrgAppEmailConfigSetting";
import OrgWebSiteContentSetup from "../pages/super-admin/setup/website/OrgWebSiteContentSetup";
import MstCountry from "./super-admin/setup/masters/mst-country/MstCountry";
import MstState from "./super-admin/setup/masters/mst-state/MstState";

const SharedComponent = ({ data }) => {
    const [MyData, setMyData] = useState();
    const [UserInfo, setUserInfo] = useState(async () => {
        try {
            //debugger
            //return 'asd';
            //await AuthService.GetUserInfo().then(
            //    (response) => {
            //        const data = response.data;
            //        console.log(response);

            //        if (data) {
            //            if (data.Result) {
            //                return data;
            //                //const resData = data.Data;
            //                //bool = true;
            //            }
            //        }
            //        //if (!bool) {
            //        //    //navigate('/auth/login');
            //        //}
            //    },
            //    (error) => {
            //        console.log(error);
            //        //navigate('/auth/login');
            //    }
            //);



            const instance = axios.create({
                baseURL: 'http://localhost:2000/api',//process.env.BackendEducationApp_DevBaseUri,
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': 'test-key'//process.env.BackendEducationApp_Key
                }
            });
            instance({
                'method': 'POST',
                'url': '/AuthenticatedUserInfo'
            }).then((response) => {
                //debugger;
                //console.log(response);
            }).catch((error) => {
                console.log(error);
            });



        } catch (e) {
            console.log(e);
            //navigate('/auth/login');
        }
    });
    //UserInfo.then(function (result) {
    //    //debugger
    //    // here you can use the result of promiseB
    //    console.log(result);
    //});
    //console.log();
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
                        else if (data.component === "MapFormAccount") {
                            return <MapFormAccount />
                        }
                        else if (data.component === "MapUserAccount") {
                            return <MapUserAccount />
                        }
                        else if (data.component === "MapFormRole") {
                            return <MapFormRole />
                        }
                        else if (data.component === "AcadAdminDashboard") {
                            return <AcadAdminDashboard />
                        }
                        else if (data.component === "AcadParentDashboard") {
                            return <AcadParentDashboard />
                        }
                        else if (data.component === "AcadStudentDashboard") {
                            return <AcadStudentDashboard />
                        }
                        else if (data.component === "AcadTeacherDashboard") {
                            return <AcadTeacherDashboard />
                        }
                        else if (data.component === "AcadMstSetupMedium") {
                            return <AcadMstSetupMedium />
                        }
                        else if (data.component === "AcadMstSetupSection") {
                            return <AcadMstSetupSection />
                        }
                        else if (data.component === "AcadMstSetupSubject") {
                            return <AcadMstSetupSubject />
                        }
                        else if (data.component === "AcadMstSetupClass") {
                            return <AcadMstSetupClass />
                        }
                        else if (data.component === "AcadMapClassSubject") {
                            return <AcadMapClassSubject />
                        }
                        else if (data.component === "AcadMapClassTeacher") {
                            return <AcadMapClassTeacher />
                        }
                        else if (data.component === "AcadMapClassSubject") {
                            return <AcadMapClassTeacher />
                        }
                        else if (data.component === "AcadMapSubjectTeacher") {
                            return <AcadMapSubjectTeacher />
                        }
                        else if (data.component === "AcadMapStudentClass") {
                            return <AcadMapStudentClass />
                        }
                        else if (data.component === "AcadMapStudentPromote") {
                            return <AcadMapStudentPromote />
                        }
                        else if (data.component === "AcadStudentDetails") {
                            return <AcadStudentDetails data={data} />
                        }
                        else if (data.component === "AcadMstSetupStudentCategory") {
                            return <AcadMstSetupStudentCategory />
                        }
                        else if (data.component === "AcadMstStudentAssignment") {
                            return <AcadMstStudentAssignment />
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
