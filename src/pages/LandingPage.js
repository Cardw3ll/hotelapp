import React from 'react'
import '../style.css'
import { useEffect,useState} from 'react';
import data from '../data';
import Profile from '../profile';
import Services from "../Components/Services";
import FeaturedRooms from "../Components/FeaturedRooms";
import Hero from "../Components/Hero";
import { Link } from 'react-router-dom';
import img6 from '../pp.png';
import {logout} from "../firebase"
import NavBar from '../navBar';

function LandingPage() {

 
  const [people] = useState(data);
  const [index,setIndex] = useState(0);

  useEffect(()=>{
      const lastIndex = people.length-1;
      if(index < 0){
          setIndex(lastIndex);
      }
      if(index > lastIndex)
      {
          setIndex(0);
      }
  },[index,people]);

  useEffect(()=>{
      let slider = setInterval(()=>{
          setIndex(index + 1)
      },10000);
      return()=>{
          clearInterval(slider)
      }
  }, [index])



    
  return (
 <div>
<Hero hero="defaultHero"></Hero>
 <div>
  {people.map((item,indexPeople)=>{
                const {id,name, quote,image1,welcomeMsg,firstParagraph, secondParagraph,image2,image3}=item;
               
                let position ="nextSlide";
                if(indexPeople === index){
                    position="activeSlide"
                }
                if(indexPeople === index - 1|| (index === 0 && indexPeople === people.length - 1)){
                    position="lastSlide"
                }
                return(

<article  className={position} key = {id}>


 `<NavBar/>`
     
  <section class="home" id="home">
    <div class="head_container">
      <div class="box">
        <div class="text">
          <h1>{name }</h1>
          <p>{quote} </p>
          <button><Link to = "/Rooms">MORE INFO </Link>  </button>
        </div>
      </div>
      <div class="image">
        <img src={image1} class="slide"/>
      </div>
   
    </div>
  </section>

  <section class="book">

  </section>
  <section class="about top" id="about">
    <div class="container flex">
      <div class="left">
        <div class="img">
          <img src={image3} alt="" class="image1"/>
          <img src={image2} alt="" class="image2"/>
        </div>
      </div>
      <div class="right">
        <div class="heading">
          <h5>RAISING COMFOMRT TO THE HIGHEST LEVEL</h5>
          <h2>{welcomeMsg} </h2>
          <p>{firstParagraph} </p>
          <p>{secondParagraph} </p>
          <button class="btn1">READ MORE</button>
        </div>
      </div>
    </div>
  </section>

  </article>       );
              })}  </div>  
               {/* <Services />
          <FeaturedRooms /> */}
 </div>
  )
}

export default LandingPage