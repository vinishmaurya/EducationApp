import IndexMstRole from "../../../../../pages/super-admin/setup/masters/mst-role/IndexMstRole";
import AddEditMstRole from "../../../../../pages/super-admin/setup/masters/mst-role/AddEditMstRole";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { NavLink } from "react-router-dom";
const MstRole = (props) => {
    const data = props.data;
    //console.log(props.landingComponent);
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
                if (MyComponent == "IndexMstRole") {
                    return <IndexMstRole />
                }
                else if (MyComponent == "AddEditMstRole") {
                    return <AddEditMstRole pageTitle={data.innerComponentName}  />
                }
            })()}
        </>
    );
};

export default MstRole;
