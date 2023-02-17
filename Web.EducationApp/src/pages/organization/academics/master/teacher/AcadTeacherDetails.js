import AcadTeacherIndex from "../../../../../pages/organization/academics/master/teacher/AcadTeacherIndex";
import AcadMstAddEditTeacher from "../../../../../pages/organization/academics/master/teacher/AcadMstAddEditTeacher";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { NavLink } from "react-router-dom";
const AcadTeacherDetails = (props) => {
    const data = props.data;
    //console.log(data);
    // Declare a new state variable, which we'll call "Component"
    const [MyComponent, setMyComponent] = useState(data.landingComponent);
    const [MyInnerComponentName, setMyInnerComponentName] = useState(data.innerComponentName);

    function loadComponent() {
        if (MyComponent == data.landingComponent) {
            //Go to add/edit component
            setMyInnerComponentName(data.backMainComponentName);
            setMyComponent(data.innerComponentList);
        }
        else {
            //Back to index component
            setMyInnerComponentName(data.innerComponentName);
            setMyComponent(data.landingComponent);
        }
    }
    return (
        <>
            <div className="full-doc">
                <input type="button"
                    href="#"
                    className="btn btn-primary btn-sm"
                    rel="noreferrer"
                    onClick={loadComponent}
                    value={MyInnerComponentName}
                />
                {
                    //<FontAwesomeIcon icon={faPlus} />
                }
            </div>
            {(() => {
                if (MyComponent == "AcadTeacherIndex") {
                    return <AcadTeacherIndex />
                }
                else if (MyComponent == "AcadMstAddEditTeacher") {
                    return <AcadMstAddEditTeacher pageTitle={data.innerComponentName} />
                }
            })()}
        </>
    );
};

export default AcadTeacherDetails;

