import { useState, useEffect, useCallback } from "react";

const VALUE = "value";
const ERROR = "error";
const REQUIRED_FIELD_ERROR = "This is required field";

/**
 * Determines a value if it's an object
 *
 * @param {object} value
 */
function is_object(value) {
    return typeof value === "object" && value !== null;
}

/**
 *
 * @param {string} value
 * @param {boolean} isRequired
 */
function is_required(value, isRequired, error) {
    if (!value && isRequired) {
        return error === "" ? REQUIRED_FIELD_ERROR : error;
    }
    return "";
}

function get_prop_values(stateSchema, prop) {
    return Object.keys(stateSchema).reduce((accumulator, curr) => {
        accumulator[curr] = !prop ? false : stateSchema[curr][prop];

        return accumulator;
    }, {});
}

/**
 * Custom hooks to validate your Form...
 *
 * @param {object} stateSchema model you stateSchema.
 * @param {object} stateValidatorSchema model your validation.
 * @param {function} submitFormCallback function to be execute during form submission.
 */
function useFormValidator(
    stateSchema = {},
    stateValidatorSchema = {},
    submitFormCallback
) {
    const [state, setStateSchema] = useState(stateSchema);

    const [values, setValues] = useState(get_prop_values(state, VALUE));
    const [errors, setErrors] = useState(get_prop_values(state, ERROR));
    const [dirty, setDirty] = useState(get_prop_values(state));

    const [disable, setDisable] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    // Get a local copy of stateSchema
    useEffect(() => {
        setStateSchema(stateSchema);
        setDisable(true); // Disable button in initial render.
        setInitialErrorState();
    }, []); // eslint-disable-line

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => {
        if (isDirty) {
            setDisable(validateErrorState());
        }
    }, [errors, isDirty]); // eslint-disable-line

    // Validate fields in forms
    const validateFormFields = useCallback(
        (name, value) => {
            //debugger;
            const validator = stateValidatorSchema;
            // Making sure that stateValidatorSchema name is same in
            // stateSchema
            if (!validator[name]) return;

            const field = validator[name];

            let error = "";

            error = is_required(value, field.required, stateSchema[name].error);

            if (is_object(field["validator"]) && error === "") {
                const fieldValidator = field["validator"];

                // Test the function callback if the value is meet the criteria
                const testFunc = fieldValidator["func"];
                if (!testFunc(value, values) && (value !== "")) {
                    error = fieldValidator["error"];
                }
            }

            return error;
        },
        [stateValidatorSchema, values]
    );

    // Set Initial Error State
    // When hooks was first rendered...
    const setInitialErrorState = useCallback(() => {
        Object.keys(errors).map(name =>
            setErrors(prevState => ({
                ...prevState,
                [name]: validateFormFields(name, values[name])
            }))
        );
    }, [errors, values, validateFormFields]);

    // Used to disable submit button if there's a value in errors
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    const validateErrorState = useCallback(
        () => Object.values(errors).some(error => error),
        [errors]
    );

    // Event handler for handling changes in input.
    const handleOnChange = useCallback(
        event => {
            setIsDirty(true);
            //debugger;
            const name = event.target.name;
            const value = event.target.value;

            const error = validateFormFields(name, value);

            setValues(prevState => ({ ...prevState, [name]: value }));
            setErrors(prevState => ({ ...prevState, [name]: error }));
            setDirty(prevState => ({ ...prevState, [name]: true }));
        },
        [validateFormFields]
    );

    const handleOnSubmit = useCallback(
        event => {
            event.preventDefault();

            // Making sure that there's no error in the state
            // before calling the submit callback function
            if (!validateErrorState()) {
                submitFormCallback(event, values);
            }
        },
        [validateErrorState, submitFormCallback, values]
    );
    // Event handler for handling changes in input.
    const handleOnClear = useCallback(
        event => {
            setIsDirty(false);
            setStateSchema(stateSchema);
            setDisable(true); // Disable button in initial render.
            setInitialErrorState();
        },
        []
    );

    return {
        handleOnChange,
        handleOnSubmit,
        handleOnClear,
        values,
        errors,
        disable,
        setValues,
        setErrors,
        dirty
    };
}

export default useFormValidator;
