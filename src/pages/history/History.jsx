import React, { useEffect, useState } from 'react';

import './history.scss';
import axios from 'axios';
import { ChevronLeftRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const History = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/history')
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="history">
            <Link to={-1}>
                <ChevronLeftRounded className="backIcon" />
            </Link>
            <h1 className="title">History</h1>
            <div className="results">
                {isLoading ? (
                    'Loading...'
                ) : data ? (
                    data.map((result) => (
                        <div className="item">
                            <div className="params">
                                <span className="param">Batch Size: {result.batch_size}</span>
                                <span className="param">Learning Rate: {result.lr}</span>
                                <span className="param">Epoch: {result.epoch}</span>
                                <span className="param">
                                    Hidden Layers: [{result.hidden01}, {result.hidden02}]
                                </span>
                            </div>
                            <div className={`accuracy ${result.accuracy >= 50 ? 'good' : 'bad'}`}>
                                Accuracy: {parseFloat(result.accuracy).toFixed(2)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '120px' }}>History is empty!!!</div>
                )}
            </div>
        </div>
    );
};

export default History;
