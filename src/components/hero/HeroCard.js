
import { Link } from "react-router-dom";
import React from "react";

const heroImages = require.context('../../assets', true);

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {

  const imagePath = heroImages(`./${id}.jpg`);

  return (
    <div className="col">
      <div className="card h-100 shadow">
        <div className="row h-100">
          <div className="col-4">
            <img
              src={ imagePath }
              className={"card-img-top h-100"}
              alt={superhero}
              style={{objectFit: 'cover'}}
            />
          </div>
          <div className="col-8">
            <div className="card-body">

              <h5 className="card-title">{ superhero }</h5>
              <p className="card-text">{ alter_ego }</p>
              { (alter_ego !== characters) && <p className="text-muted">{ characters }</p> }
              <p className="card-text">
                <small className="text-muted">{ first_appearance }</small>
              </p>
              <Link to={`/hero/${id}`}>Más...</Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
