import { heroes } from "../data/heroes"

export const getHeroesByPublisher = ( publisher ) => {

  const validPublishers = ['DC Comics', 'Marvel Comics', 'All'];
  
  if (!validPublishers.includes( publisher )) {
    throw new Error (`${ publisher } is not a valid publisher`);
  }

  if (publisher === validPublishers[2]) {
    return heroes;
  }

  return heroes.filter( hero => hero.publisher === publisher );
  
}