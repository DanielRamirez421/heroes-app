import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { DcScreen } from '../components/dc/DcScreen';
import { HeroScreen } from '../components/hero/HeroScreen';
import { HeroesScreen } from '../components/hero/HeroesScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <Routes>
          <Route path=""               element={<HeroesScreen />} />
          <Route path="marvel"         element={<MarvelScreen />} />
          <Route path="dc"             element={<DcScreen />} />
          <Route path="hero/:heroId"   element={<HeroScreen />} />
          <Route path="search"         element={<SearchScreen />} />
        </Routes>
      </div>
    </>
  )
}
