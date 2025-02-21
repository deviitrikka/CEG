// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000";  // FastAPI backend

// // Function to call an example FastAPI endpoint
// export const fetchData = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// };

// // Function to send a query to the AI model
// export const askAI = async (question) => {
//   try {
//     const response = await axios.post(`${API_URL}/ask/`, { question });
//     return response.data.response;
//   } catch (error) {
//     console.error("Error querying AI:", error);
//     return "Error in AI response";
//   }
// };
