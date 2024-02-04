// import { useState } from "react";
// import InputBox from "./components/InputBox";
// import useCurrencyInfo from "./hooks/useCurrencyInfo.js";

// function App() {
//   const [amount, setAmount] = useState(0);
//   const [from, setFrom] = useState("usd");
//   const [to, setTo] = useState("inr");
//   const [convertAmount, setConvertAmount] = useState(0);

//   const currencyInfo = useCurrencyInfo(from);

//   const options = Object.keys(currencyInfo);

//   const swap = () => {
//     setFrom(to);
//     setTo(from);
//     setConvertAmount(amount);
//     setAmount(convertAmount);
//   };

//   const convert = () => {
//     setConvertAmount(amount * currencyInfo[to]);
//   };

//   return (
//     <div
//       className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1706955279426-9924ebe60002?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
//         backgroundSize: "cover",
//       }}
//     >
//       <div className="w-full">
//         <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               convert();
//             }}
//           >
//             <div className="w-full mb-1">
//               <InputBox
//                 label="From"
//                 amount={amount}
//                 currencyOptions={options}
//                 onCurrencyChange={(currency) => setAmount(amount)}
//                 selectCurrency={from}
//                 onAmountChange={(amount)=>setAmount(amount)}
//               />
//             </div>
//             <div className="relative w-full h-0.5">
//               <button
//                 type="button"
//                 className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
//                 onClick={swap}
//               >
//                 swap
//               </button>
//             </div>
//             <div className="w-full mt-1 mb-4">
//               <InputBox
//                 label="To"
//                 amount={convertAmount}
//                 currencyOptions={options}
//                 onCurrencyChange={(currency) => setTo(currency)}
//                 selectCurrency={to}
//                 amountDisable
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
//             >
//               Convert {from.toUpperCase()} to {to.toUpperCase()}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://65ae8ccb1dfbae409a751452.mockapi.io/fakeData';

const CrudComponent = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', email: '' });

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to add a new item
  const addItem = async () => {
    try {
      const response = await axios.post(API_URL, newItem);
      // Assuming the API returns the added item, update the state
      setData([...data, response.data]);
      setNewItem({ name: '', email: '' }); // Clear input fields
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Function to update an existing item
  const updateItem = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      // Assuming the API doesn't return the updated item, manually update the state
      const updatedData = data.map(item => (item.id === id ? updatedItem : item));
      setData(updatedData);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Function to delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Assuming the API doesn't return the deleted item, manually update the state
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.email}</span>
            <button onClick={() => updateItem(item.id, { ...item, name: 'UpdatedName' })}>
              Update
            </button>
            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={newItem.email}
        onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
      />
      <button onClick={addItem}>
        Add Item
      </button>
    </div>
  );
};

export default CrudComponent;

