export const base_url = "http://localhost:8070/";
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

// export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
//     }`,
//     Accept: "application/json",
//   },
// };

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjE4NTgyODNjMTIzZmI4ZmFlMmMwZCIsImlhdCI6MTcxNDcxMzQ2OSwiZXhwIjoxNzE0OTcyNjY5fQ.3GP7prqMwerZfF7Z7zqO2AzR9vSz-pxCOsEVzzeDICI"; // Replace 'your-token' with the actual token

export const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
