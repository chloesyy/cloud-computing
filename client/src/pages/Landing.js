import { Link } from "react-router-dom";
import Wrapper from "./wrappers/Landing";
import landing from "./images/landing.png";

const LandingPage = () => {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            HISH <span>Breast Cancer Risk Profiling</span> App
          </h1>
          <p>
            Machine Learning application for your health assurance.
          </p>
          <Link to="/login" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={landing} alt="landing" className="img main-img" style={{width: 625}}/>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
