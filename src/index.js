import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { HomePage } from './pages/homepage/homepage.component';
import { ShopPage } from './pages/shop/shop.component';

export const HatsPage = () =>  (
  <div>
    <h1>HATS PAGE</h1>
  </div>
 )

export const Hat = () =>  {
  let params = useParams();

   return (
    <div>
      <h1>HAT #{params.hatId} </h1>
    </div>
   )
 }


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="shop/hats" element={<HatsPage />} />
      <Route path="shop/hats/:hatId" element={<Hat />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
