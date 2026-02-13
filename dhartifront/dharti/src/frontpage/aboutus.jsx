import React from "react";
import '../index.css';
import one from '../assets/pic1.jpg';
import three from '../assets/pic2.jpg';
import two from '../assets/pic3.jpg';
import four from '../assets/pic5.jpg';
import phone from '../assets/phonefinal.png'


export function AboutUs() {
    return (
        <div className="aboutus bg-[#E6F0DC] inline-flex gap-[25px]">
            <div className="box1 w-[47vw] h-[1000px]">
                
                <div className="first flex">
                    <div className="one relative top-[150px] left-[130px] w-[400px] h-[370px]">
                        <img src={one} className="image rounded-[15px]" />
                    </div>
                    <div className="two relative top-[185px] left-[145px] h-[200px]">
                        <img src={two} className="image rounded-[15px]" />
                    </div>
                </div>
                <div className="second flex">
                    <div className="three relative top-[28px] left-[130px] w-[400px] h-[350px]">
                        <img src={three} className="image rounded-[15px] " />
                    </div>
                    <div className="four relative top-[130px] left-[145px] w-[170px] h-[200px] rounded-[15px] overflow-hidden">
                        <img src={four} className="image rounded-[15px] " /></div>
                </div>
            </div>

            <div className="box2 w-[52vw] h-[1000px]">
                <p className="heading text-[30px] font-[600] mt-[180px]">About Us</p>
                <p className="bighead text-[45px] font-[700] mt-[20px]">Join The Race To Make The World A Better Place</p>
                <p className="text text-[18px] mt-[18px]">As global waste continues to grow placing tremendous strain on landfills, ecosystems, and climate, the need for efficient recycling and resource recovery systems has never been greater. Recycling reduces greenhouse gas emissions, conserves critical natural resources like timber, minerals, and water, and saves energy and ultimately protects the planet for future generations. Yet worldwide recycling rates remain low, underlining the urgent need for grassroots, impactful solutions to close the waste loop.</p>
                <p className="text2 text-[18px] mt-[15px]">That's why we started Dharti Pickups. By diverting waste from landfills and reducing reliance on virgin materials, we cut energy usage and lower carbon emissions—plastic recycling alone saves up to 95% energy compared to new production. We also fuel local economic growth—recycling supports job creation, helps communities thrive, and strengthens the circular economy overall.</p>
                <div className="phone bg-[rgb(201,201,201)] h-[120px] w-[570px] rounded-[12px] flex items-center mt-[100px] text-[#2F855A]">
                    <div className="logo h-[75px] w-[75px] mt-[-2rem] ml-[7px]"><img className="phoneimg h-[110px] w-[120px] " src={phone} /></div>
                    <div className="info">
                        <p className="cont text-[28px] font-[600] p-[7px]"> For Any Enquiries Call The Helpline:<br />
                        </p>
                        <p className="num text-[#2D3748] text-lg font-[700]"> +91 123 456 7890</p>
                    </div>
                </div>
            </div>
        </div>
    )
}