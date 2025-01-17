import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { useNavigate } from 'react-router-dom'

const Home = ({isAdmin}) => {

  const [category, setCategory] = useState("All");
  const navigate = useNavigate();


  return (
    <>
    {isAdmin? navigate("/add"):<></>}
      <Header />
      <ExploreMenu  category= {category} setCategory= {setCategory}/>
      <FoodDisplay category= {category} />
      <AppDownload />
    </>
  )
}

export default Home
