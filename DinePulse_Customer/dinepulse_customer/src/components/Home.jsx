import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import promoimage1 from "../assets/karari-roomali.jpg";
import promoimage2 from "../assets/SmoothieRainbow.jpg";
import promoimage3 from "../assets/Shrimp-Linguini.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="intro-section">
        <div className="intro-text">
          <h1>Welcome to DinePulse</h1>
          <p>
            Where exceptional cuisine meets a delightful atmosphere. Situated in
            the heart of Kitchener, DinePulse is not just a restaurant; it's an
            experience designed to excite your taste buds and relax your soul.
            Our dedication to food goes beyond the kitchen, with each dish
            meticulously prepared using fresh, locally-sourced ingredients.
          </p>
          <p>
            At DinePulse, we believe in the power of flavors to create lasting
            memories. From our signature dishes inspired by international
            cuisines to our chef's specials crafted with creativity and passion,
            every bite offers a journey of culinary delight. Whether you’re a
            food enthusiast seeking new adventures or a casual diner looking for
            a comforting meal, our diverse menu has something to please every
            palate.
          </p>
          <p>
            Join us at DinePulse and embark on a unique gastronomic journey. Let
            us provide you with an unforgettable dining experience that will
            have you coming back for more.
          </p>
        </div>
        <div className="buttons">
          <button
            onClick={() => navigate("/reserve")}
            aria-label="Reserve a table"
          >
            Reserve a Table Today
          </button>
        </div>
      </header>
      <br />

      {/* Promotional Content */}
      <div className="promotional-dishes">
        <h1>Our Special Dishes</h1>
        <p className="promotional-dishes-subheading">
          Savor the artistry of flavors with our curated selection of culinary
          masterpieces...
        </p>
        <br />
        <div className="slider">
          <div className="slider-track">
            <div className="promotional-dish">
              <div className="promotion">
                <span>Special</span>
              </div>
              <img src={promoimage1} alt="Karari Roomali" />
              <h2>Karari Roomali</h2>
              <p>
                Karari Roomali is a popular Indian appetizer. Thin, crispy bread
                served folded, stuffed, or plain, often accompanied by
                chutneys. Delightfully satisfying street food with diverse
                fillings and flavors.
              </p>
            </div>
            <div className="promotional-dish">
              <div className="promotion">
                <span>Exclusive</span>
              </div>
              <img src={promoimage2} alt="Rainbow Smoothie" />
              <h2>Rainbow Smoothie</h2>
              <p>
                Indulge in a vibrant rainbow smoothie with layers of
                antioxidant-rich fruits and creamy Greek yogurt, each adding a
                burst of color and flavor to this delightful treat!
              </p>
            </div>

            <div className="promotional-dish">
              <img src={promoimage3} alt="Shrimp Linguini" />
              <h2>Shrimp Linguini</h2>
              <p>
                Plump, succulent shrimp intertwine with al dente pasta,
                enveloped in a vibrant garlic cream sauce, creating a satisfying
                and effortlessly elegant dinner experience reminiscent of
                classic Italian culinary traditions.
              </p>
            </div>

            <div className="promotional-dish">
              <div className="promotion">
                <span>Special</span>
              </div>
              <img src={promoimage1} alt="Karari Roomali" />
              <h2>Karari Roomali</h2>
              <p>
                Karari Roomali is a popular Indian appetizer. Thin, crispy bread
                served folded, stuffed, or plain, often accompanied by
                chutneys. Delightfully satisfying street food with diverse
                fillings and flavors.
              </p>
            </div>
            <div className="promotional-dish">
              <div className="promotion">
                <span>Exclusive</span>
              </div>
              <img src={promoimage2} alt="Rainbow Smoothie" />
              <h2>Rainbow Smoothie</h2>
              <p>
                Indulge in a vibrant rainbow smoothie with layers of
                antioxidant-rich fruits and creamy Greek yogurt, each adding a
                burst of color and flavor to this delightful treat!
              </p>
            </div>

            <div className="promotional-dish">
              <img src={promoimage3} alt="Shrimp Linguini" />
              <h2>Shrimp Linguini</h2>
              <p>
                Plump, succulent shrimp intertwine with al dente pasta,
                enveloped in a vibrant garlic cream sauce, creating a satisfying
                and effortlessly elegant dinner experience reminiscent of
                classic Italian culinary traditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
