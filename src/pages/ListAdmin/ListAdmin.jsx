import React, { useEffect, useState } from "react";
import "./ListAdmin.css";
import axios from "axios";
import { toast } from "react-toastify";

const ListAdmin = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:8000/productData";

  const fetchList = async () => {
    const response = await axios.get('http://localhost:8000/productData');
    console.log(response.data);

    if (response.data) {
      setList(response.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList(); 
  }, []);

  const removeFood = (foodId) =>{
    axios
    .delete(`http://localhost:8000/productData/${foodId}`)
    .then(() => {
      setList((prevList) => prevList.filter((list) => list.id !== foodId));
      toast.success('Product deleted successfully!');
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    });
    
  }

  return ( 
  <div className="list add flex-col">
    <p>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item,index)=>{
        return(
          <div key={index} className="list-table-format">
            <img src={item.image} alt="" />
            <p>{item.data.name}</p>
            <p>{item.data.category}</p>
            <p>${item.data.price}</p>
            <p onClick={()=>removeFood(item.id)} className="cursor">X</p>
          </div>
        )
      })}
    </div>
  </div>
);
};

export default ListAdmin;
