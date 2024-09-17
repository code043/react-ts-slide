import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleRight";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { technologies } from "./techs";
function App() {
  const [tech] = useState(technologies);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = tech.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, tech]);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {tech.map((person, personIndex) => {
          const { id, image, name, category, description } = person;

          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === tech.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{category}</p>
              <p className="text">{description}</p>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index + 1)}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </button>
        <button className="next" onClick={() => setIndex(index - 1)}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </button>
      </div>
    </section>
  );
}

export default App;
