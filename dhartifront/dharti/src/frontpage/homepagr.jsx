import React, { useState, useEffect } from "react";
import '../index.css';
import logo from '../assets/logooo.png';
import bg from '../assets/bg.jpg';
import { Link } from "react-router-dom";
import SignIn from './signin';
import axios from "../api/axiosConfig";
import box1 from '../assets/box1.jpg';
import box2 from '../assets/box2.jpg';
import box3 from '../assets/box3.jpg';
import box4 from '../assets/box4.jpg';
import box5 from '../assets/box5.jpg';
import logo2 from '../assets/visionfinal.png';

export function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); //extra
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

    useEffect(() => {
    // Show banner after a delay
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 500); // Delay in ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
     
  const checkAuth = async () => {
    try {
      await axios.get("/api/user/profile");
      setIsLoggedIn(true);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Auth error", err);
      }
      setIsLoggedIn(false);
    } finally {
      setLoadingAuth(false);
    }
  };
  checkAuth();
}, []);


  // for loginnew
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "true") {
      setShowModal(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // await axios.post("https://project-dharti-pickups.onrender.com/api/user/logout", {}, {
      //   withCredentials: true,
      // });
      await axios.post("/api/user/logout");
    } catch (err) {
      console.error("Logout failed", err);
    }
    setIsLoggedIn(false);
    alert("Logged out successfully.");
  };
  // banner
  const handleClose = () => {
    setShowBanner(false);
  };

  if (loadingAuth) {
  return <div>Loading…</div>; // simple loader placeholder
}

  return (
    <div className="homepage">
      <div className="container h-screen bg-cover bg-center bg-[rgba(1,26,16,0.737)]
            bg-blend-overlay"
        style={{ backgroundImage: `url(${bg})` }}>

        <header className="header">
          <div className="headcontent">
            <img src={logo} alt="logo" className="logo" />
            <div className="txthead"> Dharti Pickups<br />
              <span className="tagline">From Waste to Wonder </span>
            </div>
            <nav className="navlinks">
              <Link to="/profile">My Profile</Link>
              <Link to="/requestpickup">Request Pickup</Link>

              {/* <Link to="/notifications">Notifications</Link> */}
              <Link to="/aboutus">About Us</Link>

              {isLoggedIn ? (
                <button className="logout" onClick={() => setShowConfirmLogout(true)}>Logout</button>
              ) : (
                <button className="login" onClick={() => setShowModal(true)}>Login</button>
              )}

            </nav>
            <SignIn
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onLoginSuccess={() => setIsLoggedIn(true)}
            />
          </div>
        </header>
        <div className="main">
          Dharti Pickups
        </div>
        <div className="side">We close the loop by transforming trash into treasure, reducing landfill impact and creating sustainable value for our planet.</div>
      </div>

      {/* banner */}
      {/* <div className="fixed bottom-0 left-0 w-full bg-white/90 text-black border-t border-gray-300 shadow-md px-4 py-7 text-center z-[1000]">
  <span>
    ⚠️ This is a demo project for educational use only. No real pickups are scheduled.
  </span>
  <button
    className="absolute top-2 right-4 text-black hover:text-gray-800 text-sm"
    onClick={() => alert('Banner close clicked')}
    aria-label="Close Disclaimer"
  >
    &times;
  </button>
</div> */}
{/* right one */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-black/60 text-white border-t border-gray-300 shadow-md px-4 py-7 text-center z-[9999]">
          <span>
            ⚠️ This is a demo project for educational use only. No real pickups are scheduled. Please do not submit sensitive information.
          </span>
          <button
            className="absolute top-2 right-4 text-white hover:text-gray-800 text-sm"
            onClick={handleClose}
            aria-label="Close Disclaimer"
          >
            &times;
          </button>
        </div>
      )}

      {/* for css */}
      {/* <div className="banner">
  <span className="banner__message">
    ⚠️ This is a demo project for educational use only. No real pickups are scheduled.
  </span>
  <button
    className="banner__close-btn"
    onClick={() => alert('Banner close clicked')}
    aria-label="Close Disclaimer"
  >
    &times;
  </button>
</div> */}


      {/* second part */}
      <div className="secondpart">
        <div className="up">
          <div className="leftside">Here is an Insight of<br /> How We Work....</div>
          <div className="rightside">We collect waste directly from homes and businesses using our scheduled and on demand pickups. All materials are taken to our facility in already sorted manner like paper, plastic, metal, etc. After reaching us, the items go through cleaning and decontamination to ensure they’re ready for processing. Each material stream is then processed, plastics are shredded, paper is pulped, metals are baled or melted. Next, the processed materials are converted into raw forms (like pellets or pulp) in preparation for manufacturing. These raw materials are sold to companies that remake them into new goods, completing the recycling loop. We emphasize using the “buy recycled” approach purchasing products made from recycled content to help drive demand. Throughout the process, we ensure best practices in contamination control, improving efficiency and environmental impact. Our approach supports the circular economy, reducing landfill usage, saving resources, and lowering greenhouse gas emissions. Ultimately, our end to end system from collection to remanufacturing closes the resource loop, turning waste into valuable new products.
          </div>
        </div>
        {/* <!-- STEP CARDS --> */}
        <div className="steps-grid">
          <div className="step-card">
            <div className="icon1"><img src={box1} alt="Wastage Collection " /></div>
            <h3>Wastage Collection </h3>
            <p>You Collects the waste instead of throwing or dumping it, sorts it according to the waste type.</p>
            <div className="badge">01</div>
          </div>
          <div className="step-card">
            <div className="icon2"><img src={box2} alt=" Wastage Pickup" /></div>
            <h3> Wastage Pickup</h3>
            <p>Our dedicated vehicles collect scheduled or on-demand waste directly from your location for responsible recycling.</p>
            <div className="badge">02</div>
          </div>
          <div className="step-card">
            <div className="icon3"><img src={box3} alt="Upcycling Waste" /></div>
            <h3>Upcycling Waste</h3>
            <p>We transform used materials into innovative, higher value products giving them a new life and purpose.</p>
            <div className="badge">03</div>
          </div>

        </div>

      </div>

      {/* third part */}

      <div className="thirdpart">
        <section className="waste-experience">
          <h2>We Have Experience In Handling All Kinds Of Waste!</h2>

          <div className="check-grid">
            <div className="cell"><span className="check-icon">✔️</span> Waste Papers</div>
            <div className="cell"><span className="check-icon">✔️</span> Electronic Waste</div>
            <div className="cell highlight"><span className="check-icon">✔️</span> Metallic Waste</div>

            <div className="cell"><span className="check-icon">✔️</span> Packaging Plastic</div>
            <div className="cell"><span className="check-icon">✔️</span> Hard Plastic</div>
            <div className="cell"><span className="check-icon">✔️</span> Textile Waste</div>
          </div>

          <p className="callout">
            We already made huge strides in our services and sustainability journey by investing in plastic recycling.
            {/* <a href="#" className="link">Awards And Milestones →</a> */}
          </p>
        </section>
      </div>

      {/* fourth part */}
      <div className="fourthpart">
        <section className="features-section">
          <div className="cards-container">
            <div className="feature-card">
              <img src={box5} alt="Donation" className="card-bg" />
              <div className="card-overlay"></div>
              <div className="card-content">
                <h3>Your Choice Can  make impact</h3>
                <p>Your Choice can turn over the entire condition of earth. So, Please support us by giving chance to our upcycled products.</p>
              </div>
            </div>
            <div className="feature-card">
              <img src={box4} alt="Eco Energy" className="card-bg" />
              <div className="card-overlay"></div>
              <div className="card-content">
                <h3>Your Desicion Can Change Someone's Life</h3>
                <p>It is providing employment to the women of villages as itrequires personal attention. So help these women becoming Independent. </p>
              </div>
            </div>
          </div>

          <section className="vision-mission">
            <div className="vm-container">
              <div className="vm-header">
                <img src={logo2} alt="Mission Icon" className="filter brightness-0 invert w-[30px] h-[30px]" />
                <span className="vision">Vision &amp; Mission</span>
              </div>
              <h2>Create a circular
                <span className="highlight"> World</span> where nothing is <span className="highlight">Wasted</span> and every resource is <span className="highlight">Valued</span>.
              </h2>
              <p>Thank you for joining our mission together, we’re turning waste into worth. Want to learn more <a href="aboutus" className="link2">about us</a> or get involved by <a href="requestpickup" className="link2">contributing</a> ?
              </p>
            </div>
          </section>
        </section>
      </div>

      {/* extra */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-white/7 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowConfirmLogout(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                onClick={async () => {
                  await handleLogout();
                  setShowConfirmLogout(false);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
