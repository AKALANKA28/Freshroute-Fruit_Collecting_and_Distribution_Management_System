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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjYwYWE4YjU3YjY5MTVlMTI5OGU4ZiIsImlhdCI6MTcxMzc3Mzg0NywiZXhwIjoxNzEzODYwMjQ3fQ.N9I4qNpOMV4bYoiLIjHTQtTA8lIWBBj49jzP1ZyRuW4"; // Replace 'your-token' with the actual token

export const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
