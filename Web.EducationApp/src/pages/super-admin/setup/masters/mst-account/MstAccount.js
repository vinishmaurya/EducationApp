import IndexMstAccount from "../../../../../pages/super-admin/setup/masters/mst-account/IndexMstAccount";
import AddEditMstAccount from "../../../../../pages/super-admin/setup/masters/mst-account/AddEditMstAccount";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
const MstAccount = (props) => {
    useEffect(() => {
        
    }, []);
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
                if (MyComponent == "IndexMstAccount") {
                    return <IndexMstAccount />
                }
                else if (MyComponent == "AddEditMstAccount") {
                    return <AddEditMstAccount pageTitle={data.innerComponentName}  />
                }
            })()}
        </>
    );
};

export default MstAccount;
