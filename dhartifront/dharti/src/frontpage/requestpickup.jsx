import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../index.css";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import bgreq from '../assets/bgreqpickup.jpg';
import debounce from 'lodash.debounce';       //function wait for a pause before running, decrease requests in location iq api

export function RequestPickup() {
    const [location, setLocation] = useState("");
    const [type, setType] = useState("Plastic");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [locationInput, setLocationInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const apiKey = import.meta.env.VITE_LOCATIONIQ_KEY;
    const navigate = useNavigate();

    const fetchSuggestions = useCallback(async (query) => {   
          if (!query || query.length < 3) {    
            setSuggestions([]);  
            return;
        }
        try {
            const res = await fetch(
                `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json`
            );
            const data = await res.json();       
            setSuggestions(data);       
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            setSuggestions([]);
        }
    }, [apiKey]);

      
  const debouncedFetch = useMemo(   
    () => debounce(fetchSuggestions, 500),  // wait to 500ms after user stops typing before fetching suggestions
     [fetchSuggestions]
  );

  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);


    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocationInput(value);
  debouncedFetch(value); 
    };

    const handleSuggestionClick = (place) => {
        const address = place.display_place || place.display_name;
        setLocationInput(address);   
        setLocation(address);  
        setSuggestions([]);    
    };

    const saveRequest = async (e) => {
        e.preventDefault();

        const formData = new FormData();      
        formData.append("location", location);
        formData.append("type", type);       
        formData.append("weight", weight);
        formData.append("date", date);
        if (image) formData.append("image", image);

        try {
            setLoading(true);
            const res = await axios.post( "/user/request",
                formData,     
                {
                    headers: {
                    },
                }
            );

            alert(res.data.message || "Request sent successfully");

            setLocation('');
            setLocationInput('');
            setType('Plastic');
            setWeight('');
            setDate('');
            setImage(null);

            navigate("/profile");
        } catch (error) {
            console.error("Error submitting request:", error.response?.data || error.message);
            alert("Failed to send request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="requestpickup flex justify-center bg-cover bg-no-repeat bg-center py-8 px-4 min-h-screen" style={{ backgroundImage: `url(${bgreq})` }}>
            <div className="box bg-[#E6F4EA] w-full max-w-[900px] rounded-[26px] shadow-[0_2px_6px_rgba(0,0,0,0.1)] opacity-[0.88] p-8 box-border">
                <p className="heading text-[2.5rem] font-bold text-[#2F855A] text-center mb-6 mt-4">Request Waste Pickup</p>
                <form className="form bg-white border border-[#E2E8F0] rounded-lg p-8 box-border" onSubmit={saveRequest}>
                    <div>
                        <label className="label2 text-[1.225rem] font-medium text-[#2D3748] mt-6 block" htmlFor="location">Location</label>
                        <input type="text" value={locationInput} onChange={handleLocationChange} placeholder="Enter your location" 
                            className="w-full border border-gray-300 rounded px-4 py-2" required/>
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full shadow-md">
                                {suggestions.map((place, index) => (
                                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSuggestionClick(place)} >
                                        {place.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="Inline flex justify-between gap-[10rem] mt-[1rem] flex-wrap">
                        <div>
                            <label className="label2 text-[1.225rem] font-medium text-[#2D3748] mt-6 block" htmlFor="type">Waste Type</label>
                            <select className="text-[1.125rem] font-[500] border-[2px] border-[#CBD5E0] rounded-[8px] h-[45px] w-[300px] mt-[10px] pl-[20px] pr-[10px] box-border bg-white cursor-pointer"id="type" value={type} onChange={(e) => setType(e.target.value)}  required >
                                <option>Plastic</option>
                                <option>Paper</option>
                                <option>Metal</option>
                                <option>Electronics</option>
                            </select>
                        </div>

                        <div className="weight flex-1 min-w-[300px] ">
                            <label className="label2 text-[1.225rem] font-medium text-[#2D3748] mt-6 block" htmlFor="weight">Estimated Weight</label>
                            <input className="text-[1.125rem] font-[500] border-[2px] border-[#CBD5E0] rounded-[8px] h-[45px] w-full max-w-[700px] mt-[10px] pl-[20px] pr-[10px] box-border cursor-pointer"type="text" id="weight"  placeholder="eg. 50"
                                value={weight} onChange={(e) => setWeight(e.target.value)} required />
                        </div>
                    </div>
                    <div>

                        <label className="label2 text-[1.225rem] font-medium text-[#2D3748] mt-6 block" htmlFor="date">Preferred Pickup Date</label>
                        <input className="waste text-[1.125rem] font-medium border-2 border-[#CBD5E0] rounded-lg h-[45px] w-[300px] mt-[10px] pl-5 box-border" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                    </div>

                    <div>
                        <label className="label2 text-[1.225rem] font-medium text-[#2D3748] mt-6 block" htmlFor="image">Upload Image (optional)</label>
                        <input className="fileinput text-base p-2 border-2 border-[#CBD5E0] rounded-lg bg-[#F7FAFC] cursor-pointer mt-4 w-full box-border file:bg-[#38A169] file:text-white file:border-none file:px-4 file:py-2 file:mr-3 file:rounded-md file:cursor-pointer hover:file:bg-[#2F855A] file:transition-colors"
                         type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button type="submit" disabled={loading} className="w-full p-3 bg-[#38A169] text-white rounded-lg text-base cursor-pointer transition-colors duration-200 mt-12 font-semibold hover:bg-[#2F855A] disabled:bg-gray-400">
                        {loading ? "Sending..." : "Send Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}
