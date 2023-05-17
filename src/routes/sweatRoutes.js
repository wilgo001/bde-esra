import { BACKEND_URL } from ".";

export const useAllParametersGET = () => {
    const requestOption = {
        method: 'GET',
    }
    return(async () => {
        return await fetch(`${BACKEND_URL}sweat`, requestOption)
            .then(rsp => rsp.json())
            .then(data => data);
    })
}

export const useUrlImageListGET = () => {
    const requestOption = {
        method: 'GET',
    }
    return(async filename => {
        return await fetch(`${BACKEND_URL}image?filename=${filename}`, requestOption)
            .then(rsp => rsp.blob())
            .then(blob => URL.createObjectURL(blob));
    })
}