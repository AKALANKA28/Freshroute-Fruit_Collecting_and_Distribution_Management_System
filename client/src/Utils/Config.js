export const base_url = "http://localhost:8070/";
const getTokenFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer"))
: null;

export const config = {
    headers: {
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
        Accept: "application/json",
    },
};