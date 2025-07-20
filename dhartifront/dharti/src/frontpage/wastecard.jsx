import React from 'react';
import '../index.css';

export function WasteCard({ location, wasteType, weight, date, status, reward }) {
    return (
        <div className="waste-card">
            <div className="waste-card-header">
                <h3 className="location">{location}</h3>
                {status === 'verified' && <span className="badge verified">✔ verified</span>}
                {status === 'in progress' && <span className="badge in-progress">in Progress</span>}
                {status === 'pending' && <span className="badge pending">⏳ pending</span>}
            </div>

            <div className="waste-info-row">
                <p className="waste-type">{wasteType}</p>
                <p className="weight">Approximately {weight} kg</p>
                <p className="date">📅 {date}</p>
            </div>
            <div className="waste-card-footer">
                {reward ? (
                    <span className="reward-earned">🎉 Reward Earned</span>
                ) : status === 'in progress' ? (
                    <button className="action-btn">Complete & Verify</button>
                ) : (
                    <button className="action-btn">Start Collection</button>
                )}
            </div>
        </div>
    );
};