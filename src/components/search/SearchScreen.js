import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";

import queryString from "query-string";

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );

  const [ formValues, handleInputChange ] = useForm({ search: q });
  const { search } = formValues;

  let heroesFiltered = getHeroesByName(q);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${ search }`);
  };

  return (
    <div>
      <div className="row">
        <div className="col-5">
          <h4>Search</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type={"text"}
                placeholder={"Find a hero"}
                className={"form-control"}
                autoComplete="off"
                value={search}
                name={"search"}
                onChange={ handleInputChange}
                onKeyUp={ handleSearch }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary rounded-0 rounded-end"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            heroesFiltered.map((hero) => {
              return <div className="my-2 animate__animated animate__fadeIn" 
                          key={hero.id}>
                      <HeroCard {...hero} />
                     </div>;
            })
          }
          { !heroesFiltered.length && <p className="alert alert-danger">
                                        No results for: <strong>{ search }</strong>
                                      </p> }
        </div>
      </div>
    </div>
  );
};
