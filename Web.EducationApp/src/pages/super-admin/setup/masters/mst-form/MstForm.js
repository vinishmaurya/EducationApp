import IndexMstForm from "../../../../../pages/super-admin/setup/masters/mst-form/IndexMstForm";
import AddEditMstForm from "../../../../../pages/super-admin/setup/masters/mst-form/AddEditMstForm";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
const MstForm = (props) => {
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
                <a
                    href="javascript:void(0)"
                    className="btn btn-primary btn-sm"
                    rel="noreferrer"
                    onClick={loadComponent}
                >
                    {
                        //<FontAwesomeIcon icon={faPlus} />
                    }
                    {MyInnerComponentName}
                </a>
            </div>
            {(() => {
                if (MyComponent == "IndexMstForm") {
                    return <IndexMstForm />
                }
                else if (MyComponent == "AddEditMstForm") {
                    return <AddEditMstForm pageTitle={data.innerComponentName}  />
                }
            })()}
        </>
    );
};

export default MstForm;
