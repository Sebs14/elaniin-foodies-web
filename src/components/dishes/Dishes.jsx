import React from 'react'
import NumberButton from '../common/buttons/NumberButton'
import DishCard from '../common/cards/DishCard';
import Filters from '../common/filters/Filters'
import Buttons from './../common/buttons/Buttons';
import getMyDish from './../../Services/Dishes';
import getCategories from '../../Services/getCategory';
import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import NoDishes from './state/NoDishes';

const Dishes = () => {
  const [categories, setCategories] = useState([
    {
      id: '',
      name: 'Todas',
      slug: 'todas',
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState("")
  // const [page, setPage] = useState(1)
  const [dish, setDish] = useState(1)
  const [input, setInput] = useState("")

  
  
  // const pageOneClick = () =>{
  //   setPage(1)
  // }
  // const pageTwoClick = () =>{
  //   setPage(2)
  // }
  // const pageThreeClick = () =>{
  //   setPage(3)
  // }
  // const pageFourClick = () =>{
  //   setPage(4)
  // }
  
  const fetchCategory = async () => {
    const response = await getCategories()
    setCategories([...categories,...response])
    
   
  }

  const fetchDishes = async () => {
    const response = await getMyDish(1, selectedCategory, input)
    setDish(response)
    
   
  }
  console.log("hola", dish)
  useEffect(() =>{
    fetchCategory()
  },[])

  useEffect(() =>{
    fetchDishes()
  },[selectedCategory])
  
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <div className='flex lg:flex-row md:flex-col justify-center'>
          <form className="lg:px-8  md:px-40  md:block md:w-full pl-4 py-6 w-11/12 ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search Dish
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch size={"16px"} />
              </div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === "Enter"){
                    e.preventDefault()
                    fetchDishes()
                  }
                } }
                type="search"
                id="default-search"
                className="default-search rounded-lg block w-full p-4 pl-10 text-sm font-noto text-black border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Busca tu platillo favorito..."
                required
              />
            </div>
          </form>
          <Filters key={categories.id} setSelectedCategory={setSelectedCategory} categories={categories} />
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 justify-center grid-cols-1 pt-24 '>
          {dish.length > 0 ? (
            dish.map( dish => (
              <DishCard key={dish.id} price={dish.price} dish={dish.title} image={dish.image} description={dish.description}  />
            ))
          ): (
            <div className='flex justify-center items-center w-screen'>
              <NoDishes />
            </div>
          )

          }
        </div>
        <div className='flex items-center justify-center space-x-4 pt-10'>
          <NumberButton  page="1"/>
          <Buttons text="siguiente"/>          
        </div>
    </div>
  )
}

export default Dishes