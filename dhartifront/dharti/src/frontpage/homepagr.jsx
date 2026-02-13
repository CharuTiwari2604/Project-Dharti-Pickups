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
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const res = await axios.get("/user/profile");
        if (res.data) setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoadingAuth(false);
      }
    }
    checkAuth();
  }, []);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "true") {
      setShowModal(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      setIsLoggedIn(false);
      alert("Logged out successfully.");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleClose = () => {
    setShowBanner(false);
  };


  return (
    <div className="homepage">
      <div className="h-screen bg-cover bg-center bg-[rgba(1,26,16,0.737)]
            bg-blend-overlay"
        style={{ backgroundImage: `url(${bg})` }}>
        <header className="items-center p-4 relative bg-[rgba(1, 26, 16, 0.85)] flex-wrap justify-between">
          <div className="headcontent flex items-center flex-wrap justify-between w-full max-w-[1200px] mx-auto px-4">
            <div className="logo-text-wrap flex items-center gap-2 shrink-0 ">
              <img src={logo} alt="logo" className="logo h-12 w-auto shrink-0 " />
              <div className="text-container flex flex-col justify-center text-white whitespace-nowrap ">
                <div className="txthead text-[1.2rem] font-bold text-white leading-tight "> Dharti Pickups<br />
                  <span className="tagline text-[0.8rem] font-normal text-white ">From Waste to Wonder </span>
                </div>
              </div>
            </div>
            <nav className="navlinks flex items-center gap-4">
              <Link to="/profile" className="text-white text-[0.9rem] hover:underline ">My Profile</Link>
              <Link to="/requestpickup" className="text-white text-[0.9rem] hover:underline ">Request Pickup</Link>
              <Link to="/aboutus" className="text-white text-[0.9rem] hover:underline ">About Us</Link>

              {isLoggedIn ? (
                <button className="logout px-4 py-2 bg-transparent border-2 border-white rounded-[6px] text-white cursor-pointer transition-all duration-300 ease-in-out hover:text-black hover:bg-white hover:underline " 
                onClick={() => setShowConfirmLogout(true)}>Logout</button>
              ) : (
                <button className="login px-4 py-2 bg-transparent border-2 border-white rounded-[6px] text-white cursor-pointer transition-all duration-300 ease-in-out hover:text-black hover:bg-white hover:underline " 
                onClick={() => setShowModal(true)}>Login</button>
              )}
            </nav>
            <SignIn isOpen={showModal} onClose={() => setShowModal(false)} onLoginSuccess={() => setIsLoggedIn(true)} />
          </div>

        </header>
        <div className="text-[clamp(32px,8vw,85px)] flex justify-center mt-[180px] font-[800] text-white px-5 text-center [text-shadow:0_2px_4px_rgba(0,0,0,0.7) ]">
          Dharti Pickups
        </div>
        <div className="mt-10 mx-auto text-[clamp(18px,2vw,30px)] text-white max-w-[90%] w-full text-center px-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.7)] ">We close the loop by transforming trash into treasure, reducing landfill impact and creating sustainable value for our planet.</div>
      </div>

      {showBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-black/60 text-white border-t border-gray-300 shadow-md px-4 py-7 text-center z-[9999]">
          <span>
            ⚠️ This is a demo project for educational use only. No real pickups are scheduled. Please do not submit sensitive information. For Testing use Email Id= "rudra@gmail.com" and Password= "rudra"
          </span>
          <button className="absolute top-2 right-4 text-white hover:text-gray-800 text-sm" onClick={handleClose} aria-label="Close Disclaimer">
            &times;
          </button>
        </div>
      )}

      {/* second part */}
      <div className="secondpart bg-[#27433a] p-[2rem] ">
        <div className="up flex flex-wrap gap-[2rem] justify-center items-start mb-[3rem] ">
          <div className="leftside text-white text-[2.5rem] font-[600] flex-[1_1_300px] max-w-[500px] ">Here is an Insight of<br /> How We Work....</div>
          <div className="rightside text-white text-[1.2rem] leading-1.6  flex-[2_1_400px] max-w-[800px] ">We collect waste directly from homes and businesses using our scheduled and on demand pickups. All materials are taken to our facility in already sorted manner like paper, plastic, metal, etc. After reaching us, the items go through cleaning and decontamination to ensure they’re ready for processing. Each material stream is then processed, plastics are shredded, paper is pulped, metals are baled or melted. Next, the processed materials are converted into raw forms (like pellets or pulp) in preparation for manufacturing. These raw materials are sold to companies that remake them into new goods, completing the recycling loop. We emphasize using the “buy recycled” approach purchasing products made from recycled content to help drive demand. Throughout the process, we ensure best practices in contamination control, improving efficiency and environmental impact. Our approach supports the circular economy, reducing landfill usage, saving resources, and lowering greenhouse gas emissions. Ultimately, our end to end system from collection to remanufacturing closes the resource loop, turning waste into valuable new products.
          </div>
        </div>
        {/* <!-- STEP CARDS --> */}
        <div className="steps-grid grid grid-cols-3 gap-[25px] mx-[100px] mt-[50px] ">
          <div className="step-card bg-white py-[2rem] px-[1.5rem] rounded-[0.75rem] relative shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-[#0d3c1a] text-center">
            <div className="icon1 mb-4  ml-[40px] w-[200px] "><img src={box1} alt="Wastage Collection " className="w-full max-w-[220px] mx-[35px] mb-4" /></div>
            <h3 className="mb-3 text-[1.25rem] font-semibold">Wastage Collection </h3>
            <p className="text-[0.95rem] text-[#666]">You Collects the waste instead of throwing or dumping it, sorts it according to the waste type.</p>
            <div className="badge absolute top-4 right-4 bg-[#c99e45] text-white p-2 rounded-[0.75rem] font-bold">01</div>
          </div>
          <div className="step-card bg-white py-[2rem] px-[1.5rem] rounded-[0.75rem] relative shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-[#0d3c1a] text-center">
            <div className="icon2 mb-4 ml-[8rem] -scale-x-100 w-[180px]"><img src={box2} alt=" Wastage Pickup" className="w-full max-w-[220px] mx-[40px] mt-10 mb-4 " /></div>
            <h3 className="mb-3 mt-4 text-[1.25rem] font-semibold"> Wastage Pickup</h3>
            <p className="text-[0.95rem] text-[#666]">Our dedicated vehicles collect scheduled or on-demand waste directly from your location for responsible recycling.</p>
            <div className="badge absolute top-4 right-4 bg-[#c99e45] text-white p-2 rounded-[0.75rem] font-bold">02</div>
          </div>
          <div className="step-card bg-white py-[2rem] px-[1.5rem] rounded-[0.75rem] relative shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-[#0d3c1a] text-center">
           <div className="icon3 mb-4  h-auto ml-[75px] w-[160px] "><img src={box3} alt="Upcycling Waste" className="w-full max-w-[220px] mx-[35px] mb-2" /></div>
            <h3 className="mb-3 text-[1.25rem] font-semibold">Upcycling Waste</h3>
            <p className="text-[0.95rem] text-[#666]">We transform used materials into innovative, higher value products giving them a new life and purpose.</p>
            <div className="badge absolute top-4 right-4 bg-[#c99e45] text-white p-2 rounded-[0.75rem] font-bold">03</div>
          </div>
        </div>
      </div>

      {/* third part */}
      <div className="thirdpart bg-[#E6F0DC] py-[2rem] px-[1rem]">
        <section className="waste-experience max-w-[1000px] mx-auto pt-[2rem] text-center font-sans text-[#0a2a13]">
          <h2 className="text-[2.1rem] my-[2rem] font-[500]">We Have Experience In Handling All Kinds Of Waste!</h2>
          <div className="check-grid grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-0 border-[6px] border-[#eee] rounded-[0.7rem] text-[1.3rem] my-[2.5rem] overflow-hidden md:max-[1024px]:grid-cols-3">
            <div className="cell"><span className="check-icon mr-[0.75rem] text-[1.25rem]">✔️</span> Waste Papers</div>
            <div className="cell"><span className="check-icon mr-[0.75rem] text-[1.25rem]">✔️</span> Electronic Waste</div>
            <div className="cell highlight"><span className="check-icon mr-[0.75rem] text-[1.25rem]">✔️</span> Metallic Waste</div>
            <div className="cell"><span className="check-icon mr-[0.75rem] text-[1.25rem]">✔️</span> Packaging Plastic</div>
            <div className="cell"><span className="check-icon mr-[0.75rem] text-[1.25rem]">✔️</span> Hard Plastic</div>
            <div className="cell"><span className="check-icon mr-[0.75rem] text-[1.25rem]">✔️</span> Textile Waste</div>
          </div>
          <p className="callout text-[#556a5a] font-bold text-[1.1rem]">
            We already made huge strides in our services and sustainability journey by investing in plastic recycling.

          </p>
        </section>
      </div>

      {/* fourth part */}
      <div className="fourthpart ">
        <section className="features-section bg-[#27433a] py-16 px-4">
          <div className="cards-container flex flex-wrap gap-8 justify-center lg:max-[1024px]:flex-col lg:max-[1024px]:items-center">
            <div className="feature-card relative w-full max-w-[460px] h-[300px] rounded-[1rem] overflow-hidden border-[10px] border-white flex-[1_1_300px] max-[640px]:h-auto max-[640px]:aspect-[4/3]">
              <img src={box5} alt="Donation" className="card-bg w-full h-full object-cover" />
              <div className="card-overlay absolute inset-0 bg-[rgba(1,26,16,0.5)]"></div>
              <div className="card-content absolute inset-0 flex flex-col justify-center items-start p-6 text-white z-10">
                <h3 className="mb-2 text-[28px] font-[700] max-[640px]:text-[22px]">Your Choice Can  make impact</h3>
                <p className="text-[18px] leading-[1.4] max-[640px]:text-[16px]">Your Choice can turn over the entire condition of earth. So, Please support us by giving chance to our upcycled products.</p>
              </div>
            </div>
            <div className="feature-card relative w-full max-w-[460px] h-[300px] rounded-[1rem] overflow-hidden border-[10px] border-white flex-[1_1_300px] max-[640px]:h-auto max-[640px]:aspect-[4/3]">
              <img src={box4} alt="Eco Energy" className="card-bg w-full h-full object-cover" />
              <div className="card-overlay absolute inset-0 bg-[rgba(1,26,16,0.5)]"></div>
              <div className="card-content absolute inset-0 flex flex-col justify-center items-start p-6 text-white z-10">
                <h3 className="mb-2 text-[28px] font-[700] max-[640px]:text-[22px]">Your Desicion Can Change Someone's Life</h3>
                <p className="text-[18px] leading-[1.4] max-[640px]:text-[16px]">It is providing employment to the women of villages as itrequires personal attention. So help these women becoming Independent. </p>
              </div>
            </div>
          </div>
          <section className="vision-mission bg-[#27433a] text-white pt-16 px-4 pb-24">
            <div className="vm-container max-w-[800px] mx-auto text-center">
              <div className="vm-header inline-flex items-center gap-[0.6rem] mb-[3.7rem] mt-8 text-white/90">
                <img src={logo2} alt="Mission Icon" className=" w-8 h-8" />
                <span className="vision text-[24px]">Vision &amp; Mission</span>
              </div>
              <h2 className="text-[2.25rem] mb-4 leading-[1.2]">Create a circular
                <span className="highlight text-[#7fba3a]"> World</span> where nothing is <span className="highlight text-[#7fba3a]">Wasted</span> and every resource is <span className="highlight text-[#7fba3a]">Valued</span>.
              </h2>
              <p className="text-[1rem] max-w-[600px] mx-auto mt-16 text-[#e1e8e4]">Thank you for joining our mission together, we’re turning waste into worth. Want to learn more <a href="aboutus" className="link2 text-[#7fba3a]">about us</a> or get involved by <a href="requestpickup" className="link2 text-[#7fba3a]">contributing</a> ?
              </p>
            </div>
          </section>
        </section>
      </div>

      {showConfirmLogout && (
        <div className="fixed inset-0 bg-white/7 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowConfirmLogout(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                onClick={async () => {
                  await handleLogout();
                  setShowConfirmLogout(false) }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
