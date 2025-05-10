import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import './create.scss';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

const Create = () => {
    const [params, setParams] = useState({
        batch_size: '',
        lr: '',
        epoch: '',
        hidden01: '',
        hidden02: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const startTraining = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/train', params);
            const jobId = res.data.job_id;

            // Lưu jobId vào localStorage để trang Experiment lấy lại
            localStorage.setItem('jobId', jobId);

            // Chuyển hướng sang trang Experiment
            navigate('/experiment', { state: params });
        } catch (error) {
            console.error('Training failed:', error);
        }
    };

    return (
        <div className="create">
            <h1 className="title">Enter Model's Parameters</h1>
            <form className="inputs">
                <InputField label="Batch Size" name="batch_size" onChange={handleChange} />
                <InputField label="Learning Rate" name="lr" onChange={handleChange} />
                <InputField label="Epoch" name="epoch" onChange={handleChange} />
                <InputField label="Hidden Layer 1" name="hidden01" onChange={handleChange} />
                <InputField label="Hidden Layer 2" name="hidden02" onChange={handleChange} />
            </form>
            <Button onClick={startTraining}>Create</Button>
        </div>
    );
};

export default Create;
