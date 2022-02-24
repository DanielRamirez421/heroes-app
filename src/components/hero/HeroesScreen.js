import React from 'react'
import { HeroList } from './HeroList'

export const HeroesScreen = () => {
  return (
    <div>
      <h1>All Publishers</h1>
      <hr />
      <HeroList publisher={ 'All' }/>
    </div>
  )
}
