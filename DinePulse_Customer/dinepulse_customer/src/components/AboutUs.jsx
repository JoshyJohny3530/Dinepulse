import React from "react";
import "../styles/AboutUs.css";
import ceo_icon from "../assets/ceo_icon.png";
import lady_icon from "../assets/lady_icon.png";
import employee_icon from "../assets/employee_icon.png";
const AboutUs = () => {
    return (
        <div className="aboutus">
            <div className="container-outer">
                <aside className="sidebar">
                    <div className="aside_stores">
                        <h2>Our Stores</h2>
                        <div className="store_card_outer">
                            <div className="store_card">
                                <h3>Kitchener Store</h3>
                                <hr />
                                <p>
                                    <b>Location : </b> Fairway
                                </p>
                                <p>
                                    <b>Address : </b> 195 Fairway South
                                </p>
                                <p>
                                    <b>Postal Code : </b> N2C4S5
                                </p>
                                <p>
                                    <b>Phone No : </b> (516) 529 5461
                                </p>
                                <p>
                                    <b>E-mail : </b> info@fwydinepulse.com
                                </p>
                            </div>
                            <div className="store_card">
                                <h3>Cambridge Store</h3>
                                <hr />
                                <p>
                                    <b>Location : </b> Cambridge
                                </p>
                                <p>
                                    <b>Address : </b> 286 Elgin North
                                </p>
                                <p>
                                    <b>Postal Code : </b> N2F6Y4
                                </p>
                                <p>
                                    <b>Phone No : </b> (466) 128 4875
                                </p>
                                <p>
                                    <b>E-mail : </b> info@cmdinepulse.com
                                </p>
                            </div>
                            <div className="store_card">
                                <h3>Waterloo Store</h3>
                                <hr />
                                <p>
                                    <b>Location : </b> Waterloo
                                </p>
                                <p>
                                    <b>Address : </b> 52 King Street, East
                                </p>
                                <p>
                                    <b>Postal Code : </b> N6R4E7
                                </p>
                                <p>
                                    <b>Phone No : </b> (226) 548 6895
                                </p>
                                <p>
                                    <b>E-mail : </b> info@wtldinepulse.com
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="main-content">
                    <div className="about-section">
                        <h2>Who we are ????</h2>
                        <hr />
                        <p>
                            DinePulse, initially established by John Samuel, is a compact
                            enterprise. Its primary store is situated in Kitchener. Owing to
                            its commitment to delivering top-notch services and providing
                            nutritious meals to the community, the establishment swiftly
                            expanded to encompass two additional stores in Waterloo and
                            Cambridge.
                        </p>
                        <p>
                            We aim to offer our esteemed clients high-quality, healthy, and
                            delightful cuisine. We firmly believe that prioritizing healthy
                            eating is an essential need for every individual.
                        </p>
                        <p>
                            <b>Mission:</b> Supplying delectable and nutritious food products
                            of top quality.
                        </p>
                        <p>
                            <b>Foresite:</b> We are rooted in advocating for healthy dietary
                            choices.
                        </p>
                        <p>
                            <b>Core Values:</b> Our fundamental principles encompass:
                        </p>
                        <li>Quality</li>
                        <li>Healthiness</li>
                        <li>Delightfulness</li>
                        <li>Transparency</li>
                        <li>Innovation</li>
                        <hr />
                    </div>
                </section>

                <aside className="teamInfo">
                    <h2>Our Team</h2>
                    <div className="teamsDetails_outer">
                        <div className="teamsDetails">
                            <div className="team_card">
                                <img src={ceo_icon} alt="PeterHain" />
                                <div className="personalInfo">
                                    <h4>Peter Hain</h4>
                                    <p>CEO - DinePulse</p>
                                    <p>hainpeter1909@gmail.com</p>
                                    <p>
                                        <button className="contact-button">CONTACT</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="teamsDetails">
                            <div className="team_card">
                                <img src={lady_icon} alt="MaryClien" />
                                <div className="personalInfo">
                                    <h4>Mary Clien</h4>
                                    <p>Manager - Kitchener</p>
                                    <p>maryclient0502@gmail.com</p>
                                    <p>
                                        <button className="contact-button">CONTACT</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="teamsDetails">
                            <div className="team_card">
                                <img src={employee_icon} alt="JohnAntoni" />
                                <div className="personalInfo">
                                    <h4>John Antonio</h4>
                                    <p>Manager - Cambridge</p>
                                    <p>johnantonio@gmail.com</p>
                                    <p>
                                        <button className="contact-button">CONTACT</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AboutUs;
