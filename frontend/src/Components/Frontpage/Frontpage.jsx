import React from "react";
import "./App.css";
import team01 from "../../Assets/img/akash.jpeg"
import team02 from "../../Assets/img/ajit.jpeg"
import team03 from "../../Assets/img/resume_img_new.jpg"



function FrontPage() {
  return (
    <div className="App" style={{backgroundColor:"#aae2c7"}}>
      <nav className="navbar navbar-expand-lg navbar-dark" id="mainNav">
        <div className="container bg-dark" style={{marginTop: 0}}>
          <a className="navbar-brand js-scroll-trigger " href="#page-top">
            inQUIZitive
          </a>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ml-auto bg-dark">
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item" >
                <a className="nav-link js-scroll-trigger" href="#team">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="home">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="page-section" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center ">
              <h2 className="section-heading text-uppercase">Services</h2>
              <h3 className="section-subheading text-muted">
                These are ways to Quizify
              </h3>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-question fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">Quizify</h4>
              <p className="text-muted">
                Are you ready to challenge your intellect, compete with friends,
                and discover fascinating facts? Look no further! inQUIZitive.com
                is the go-to destination for quiz enthusiasts of all levels.
                Whether you're a trivia novice or a seasoned quizzer, our
                platform offers a diverse range of quizzes to cater to your
                interests.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">🏆 Leaderboards and Rankings:</h4>
              <p className="text-muted">
                Compete for the top spot on our leaderboards and earn bragging
                rights as the ultimate inQUIZitive! Track your progress, see how
                you stack up against other players, and strive to be the best in
                your favorite quiz categories.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">🔒 Secure and Safe:</h4>
              <p className="text-muted">
                Your privacy and security are our top priorities. inQUIZitive.com
                employs robust security measures to ensure a safe and enjoyable
                quizzing environment for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">About</h2>
              <h3 className="section-subheading text-muted">
                Simple Way To Quizify
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="timeline">
                <li>
                  <div className="timeline-image">
          
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Step 01</h4>
                      <h4 className="subheading">Our Humble Beginnings</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Login in the Website using your own credentials or
                        simply let google do the work
                      </p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-image">
              
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Step 02</h4>
                      <h4 className="subheading">
                        Now you are ready to be tested
                      </h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Admin or Instructor will give you necessory updates for
                        quizes.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="timeline-image">
      
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Step 03</h4>
                      <h4 className="subheading">Just give your Best</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        You can later on view your results and leadboard to
                        compare
                      </p>
                    </div>
                  </div>
                </li>

                <li className="timeline-inverted">
                  <div className="timeline-image">
                    <h4>
                      ALL
                      <br />
                      THE
                      <br />
                      BEST
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className=" page-section"   style={{backgroundColor:"rgb(170 226 199)"}} id="team">
        <div className="container"  style={{backgroundColor:"rgb(170 226 199)"}}>
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">
                Our Amazing Team
              </h2>
              <h3 className="section-subheading text-muted">
                Web developers are the digital wizards, crafting virtual realms
                with caffeine, code, and a touch of humor. In coffee shops, they
                battle bugs, converse in techspeak, and dream in lines of code.
                Approach with caution and coffee; their serious debugging faces
                hide a quirky sense of humor and a love for witty code. 🧙‍♂️💻☕️
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src={team01}
                  alt=""
                />
                <h4>Akash Gupta</h4>
                <p className="text-muted">Full Stack Developer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src={team02}
                  alt=""
                />
                <h4>Ajit</h4>
                <p className="text-muted">Full Stack Developer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src={team03}
                  alt=""
                />
                <h4>Shivansh</h4>
                <p className="text-muted">Full Stack Developer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <p className="large text-muted">
              Code sorcerers, fueled by caffeine, crafting digital magic with humor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <a href="#something">
        
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="#something">
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="#something">
                
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="#something">
  
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Contact Us</h2>
              <h3 className="section-subheading text-muted">
                Ask your doubts or give suggestion
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form id="contactForm" name="sentMessage" novalidate="novalidate">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Your Name *"
                        required="required"
                        data-validation-required-message="Please enter your name."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="Your Email *"
                        required="required"
                        data-validation-required-message="Please enter your email address."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="phone"
                        type="tel"
                        placeholder="Your Phone *"
                        required="required"
                        data-validation-required-message="Please enter your phone number."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder="Your Message *"
                        required="required"
                        data-validation-required-message="Please enter a message."
                      ></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-lg-12 text-center">
                    <div id="success"></div>
                    <button
                      id="sendMessageButton"
                      className="btn btn-primary btn-xl text-uppercase"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FrontPage;
