import { useState, useEffect } from "react";
import { technologies } from "./techs";
function App() {
  const [tech] = useState(technologies);
  const [index, setIndex] = useState(0);
  // const nextSlide = () => {
  //   setIndex((oldIndex) => (oldIndex + 1) % tech.length); // Simplificação
  // };

  // const prevSlide = () => {
  //   setIndex((oldIndex) => (oldIndex - 1 + tech.length) % tech.length); // Lidando com o ciclo de índices
  // };

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > tech.length - 1) {
        index = 0;
      }
      return index;
    });
  };
  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = tech.length - 1;
      }
      return index;
    });
  };

  useEffect(() => {
    const lastIndex = tech.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, tech.length]);

  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     setIndex((oldIndex) => {
  //       let index = oldIndex + 1;
  //       if (index > tech.length - 1) {
  //         index = 0;
  //       }
  //       return index;
  //     });
  //   }, 5000);
  //   return () => {
  //     clearInterval(slider);
  //   };
  // }, []);

  return (
    <>
      <section className="section">
        <div className="title">
          <h2>
            <span></span>reviews
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
                <img src={image} alt={name} className="tech-img" />
                <h4>{name}</h4>
                <p className="title">{category}</p>
                <p className="text">{description}</p>
              </article>
            );
          })}
          <button className="prev" onClick={prevSlide}>
            &#60;
          </button>
          <button className="next" onClick={nextSlide}>
            &#62;
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
