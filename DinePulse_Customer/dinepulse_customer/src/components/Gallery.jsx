import React from "react";
import "../styles/Gallary.css";
import galleryimage1 from "../assets/galleryimages/SmoothieAcai.jpg";
import galleryimage2 from "../assets/galleryimages/Vegan-Sushi-005.jpg";
import galleryimage3 from "../assets/galleryimages/Chicken-and-Rice-008.jpg";
import galleryimage4 from "../assets/galleryimages/Latteiced-brown-sugar-oat-milk-espresso.jpg";
import galleryimage5 from "../assets/galleryimages/Lemon-Salmon-004.jpg";
import galleryimage6 from "../assets/galleryimages/SmoothieKiwi.jpg";
import galleryimage7 from "../assets/galleryimages/SmoothieGrape.jpg";
import galleryimage8 from "../assets/galleryimages/MojitoCoconut.jpg";
import galleryimage9 from "../assets/galleryimages/MojitoPineapple.jpg";
import galleryimage10 from "../assets/galleryimages/Cottage-Cheese-Recipes-060.jpg";
import galleryimage11 from "../assets/galleryimages/restaurant1.jpg";
import galleryimage12 from "../assets/galleryimages/restaurant2.jpg";
import galleryimage13 from "../assets/galleryimages/restaurant3.jpg";
import galleryimage14 from "../assets/galleryimages/restaurant4.jpg";
import galleryimage15 from "../assets/galleryimages/restaurant5.jpg";

const Gallery = () => {
  return (
    <div className="gallery_outer">
      <section className="gallery-specials">
        <h1>Welcome to our culinary journey captured in pixels...</h1>
        <p className="gallery-specials-subheading">
          Take a virtual stroll through our gallery, and let your imagination
          wander. Imagine the aromas wafting from the kitchen, the clink of
          glasses, and the laughter of fellow diners. And when you're ready to
          make new memories of your own, we'll be here to welcome you with open
          arms and a table set just for you!!!
        </p>
        <section className="gallery-container">
          <div className="gallery">
            <img src={galleryimage1} alt="SmoothieAcai" />
          </div>

          <div className="gallery">
            <img src={galleryimage2} alt="Vegan-Sushi" />
          </div>

          <div className="gallery">
            <img src={galleryimage3} alt="Chicken-and-Rice" />
          </div>

          <div className="gallery">
            <img src={galleryimage4} alt="oat-milk-espresso" />
          </div>

          <div className="gallery">
            <img src={galleryimage5} alt="Lemon-Salmon" />
          </div>

          <div className="gallery">
            <img src={galleryimage6} alt="SmoothieKiwi" />
          </div>

          <div className="gallery">
            <img src={galleryimage7} alt="SmoothieGrape" />
          </div>

          <div className="gallery">
            <img src={galleryimage8} alt="MojitoCoconut" />
          </div>

          <div className="gallery">
            <img src={galleryimage9} alt="MojitoPineapple" />
          </div>

          <div className="gallery">
            <img src={galleryimage10} alt="Cottage-Cheese" />
          </div>

          <div className="gallery">
            <img src={galleryimage11} alt="restaurant1" />
          </div>

          <div className="gallery">
            <img src={galleryimage12} alt="restaurant2" />
          </div>

          <div className="gallery">
            <img src={galleryimage13} alt="restaurant3" />
          </div>

          <div className="gallery">
            <img src={galleryimage14} alt="restaurant4" />
          </div>

          <div className="gallery">
            <img src={galleryimage15} alt="restaurant5" />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Gallery;
