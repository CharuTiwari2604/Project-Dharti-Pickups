import React from "react";
import '../index.css';
import one from '../assets/pic1.jpg';
import three from '../assets/pic2.jpg';
import two from '../assets/pic3.jpg';
import four from '../assets/pic5.jpg';
import phone from '../assets/phonefinal.png'


export function AboutUs() {
    return (
        <div className="aboutus">
            <div className="box1">
                <div className="first">
                    <div className="one">
                        <img src={one} className="image" />
                    </div>
                    <div className="two">
                        <img src={two} className="image" />
                    </div>
                </div>
                <div className="second">
                    <div className="three">
                        <img src={three} className="image" />
                    </div>
                    <div className="four">
                        <img src={four} className="image" /></div>
                </div>
            </div>

            <div className="box2">
                <p className="heading">About Us</p>
                <p className="bighead">Join The Race To Make The World A Better Place</p>
                <p className="text">As global waste continues to grow placing tremendous strain on landfills, ecosystems, and climate, the need for efficient recycling and resource recovery systems has never been greater. Recycling reduces greenhouse gas emissions, conserves critical natural resources like timber, minerals, and water, and saves energy and ultimately protects the planet for future generations. Yet worldwide recycling rates remain low, underlining the urgent need for grassroots, impactful solutions to close the waste loop.</p>
                <p className="text2">That's why we started Dharti Pickups. By diverting waste from landfills and reducing reliance on virgin materials, we cut energy usage and lower carbon emissions—plastic recycling alone saves up to 95% energy compared to new production. We also fuel local economic growth—recycling supports job creation, helps communities thrive, and strengthens the circular economy overall.</p>
                <div className="phone">
                    <div className="logo"><img className="phoneimg" src={phone} /></div>
                    <div className="info">
                        <p className="cont"> For Any Enquiries Call The Helpline:<br />
                        </p>
                        <p className="num"> +91 123 456 7890</p>
                    </div>
                </div>
            </div>
        </div>
    )
}