import AcadParentIndex from "../../../../../pages/organization/academics/master/parent/AcadParentIndex";
import AcadMstAddEditParent from "../../../../../pages/organization/academics/master/parent/AcadMstAddEditParent";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { NavLink } from "react-router-dom";
const AcadParentDetails = (props) => {
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
                if (MyComponent == "AcadParentIndex") {
                    return <AcadParentIndex />
                }
                else if (MyComponent == "AcadMstAddEditParent") {
                    return <AcadMstAddEditParent pageTitle={data.innerComponentName} />
                }
            })()}
        </>
    );
};

export default AcadParentDetails;

