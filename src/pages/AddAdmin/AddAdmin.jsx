import React, { useState } from "react";
import "./AddAdmin.css";
import { assets } from "../../assets/assets_admin/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddAdmin = () => {
  const [image, setImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Preview URL while using json server
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 string
        setImagePreview(reader.result); // Set for preview (while working with json server)
      };
      reader.readAsDataURL(file);
    }
  };

  const finalData = {
    data,
    image,
  };

  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    //const url = "http://localhost:8000/productData";
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("description", data.description);
    // formData.append("price", data.price);
    // formData.append("category", data.category);
    // formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/productData",
        finalData
      );
      console.log("Response:", response.data);
      if (response.data) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        setImagePreview(null);
        toast.success('Food Added!');
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error('Error occured!');
    }

  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={imagePreview? imagePreview:assets.upload_area} alt="" />
            {/* <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            /> */}
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
