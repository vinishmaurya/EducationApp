import { useEffect, useRef, useState } from "react";

const useIsComponentMounted = function () {
    const isComponentMounted = useRef(false);
   
    useEffect(() => {
        isComponentMounted.current = true;
        return () => {
            isComponentMounted.current = false;
        };
    }, []);

    return isComponentMounted;
}

// Function to generate chars
const funcUniqueKey = function (length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export default { funcUniqueKey, useIsComponentMounted };