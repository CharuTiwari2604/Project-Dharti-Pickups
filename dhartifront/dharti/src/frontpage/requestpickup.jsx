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
            const res = await axios.post( "/api/requestpickup/request",
                formData,     
                {
                    headers: {
                    },
                }
            );

            alert(res.data.message || "Request sent successfully");

            // Reset form
            setLocation('');
            setLocationInput('');
            setType('Plastic');
            setWeight('');
            setDate('');
            setImage(null);

            // Redirect to profile page
            navigate("/profile");
        } catch (error) {
            console.error("Error submitting request:", error.response?.data || error.message);
            alert("Failed to send request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="requestpickup" style={{ backgroundImage: `url(${bgreq})` }}>
            <div className="box">
                <p className="heading">Request Waste Pickup</p>
                <form className="form" onSubmit={saveRequest}>
                    <div>
                        <label className="label2" htmlFor="location">Location</label>
                        <input type="text" value={locationInput} onChange={handleLocationChange} placeholder="Enter your location" 
                            className="w-full border border-gray-300 rounded px-4 py-2" required/>
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full shadow-md">
                                {suggestions.map((place, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSuggestionClick(place)}
                                    >
                                        {place.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="inline">
                        <div>
                            <label className="label2" htmlFor="type">Waste Type</label>
                            <select className="waste" id="type" value={type} onChange={(e) => setType(e.target.value)}  required >
                                <option>Plastic</option>
                                <option>Paper</option>
                                <option>Metal</option>
                                <option>Electronics</option>
                            </select>
                        </div>

                        <div className="weight">
                            <label className="label2" htmlFor="weight">Estimated Weight</label>
                            <input className="waste"  type="text" id="weight"  placeholder="eg. 50"
                                value={weight} onChange={(e) => setWeight(e.target.value)} required />
                        </div>
                    </div>
                    <div>

                        <label className="label2" htmlFor="date">Preferred Pickup Date</label>
                        <input className="waste" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                    </div>

                    <div>
                        <label className="label2" htmlFor="image">Upload Image (optional)</label>
                        <input className="fileinput" type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}
