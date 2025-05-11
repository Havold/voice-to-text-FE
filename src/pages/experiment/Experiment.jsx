import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './experiment.scss';
import { makeRequest } from '../../axios';

// Hàm fetch dữ liệu experiment mới nhất, có delay 2 giây trước khi gọi API
const fetchLatestExperiment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await axios.get('http://127.0.0.1:5000/latest_experiment');
    return res.data;
};

// Hàm fetch tiến trình training theo jobId
const fetchProgress = async (jobId) => {
    const res = await axios.get(`http://127.0.0.1:5000/progress/${jobId}`);
    return res.data;
};

const Experiment = () => {
    const [voice, setVoice] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const queryClient = useQueryClient();
    const doneRef = useRef(false); // Biến tham chiếu kiểm tra trạng thái hoàn thành
    const [btnName, setBtnName] = useState('Train Again');

    console.log(voice);

    const { isPending, error, data } = useQuery({
        queryKey: ['upload'],
        queryFn: () => {
            if (voice) {
                const formData = new FormData();
                formData.append('voice', voice);
                return makeRequest.post(`/upload`, formData).then((res) => {
                    console.log(res.data);
                    mutationConvert.mutate();
                    return res.data; // chứa file_url
                });
            }
            return null;
        },
    });

    const {
        isPending: isPendingText,
        error: errText,
        data: dataText,
    } = useQuery({
        queryKey: ['convert'],
        queryFn: () => {
            if (voice) {
                return makeRequest.post(`/convert`, { filename: voice?.name }).then((res) => {
                    setIsLoading(false);
                    console.log(res.data);
                    return res.data;
                });
            }
            return null;
        },
    });

    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setVoice(null);
            setIsLoading(true);
            mutation.mutate(file);
        }
    };

    const mutation = useMutation({
        mutationFn: (newVoice) => {
            newVoice.preview = URL.createObjectURL(newVoice);
            setVoice(newVoice);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['upload'] });
        },
    });

    const mutationConvert = useMutation({
        mutationFn: () => {},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['convert'] });
        },
    });

    console.log(data?.file_url);

    return (
        <div className="experiment">
            <h1 style={{ textAlign: 'center' }}>{voice ? 'Result' : 'Upload a file .wav that you want to convert!'}</h1>

            {data?.file_url && (
                <div className="audio-player">
                    <audio controls>
                        <source src={data.file_url} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}

            {/* Hiển thị vòng loading nếu đang training */}
            {isLoading && <div className="loadingCircle"></div>}
            {errText ? "Can't convert to text!" : dataText?.text}

            {/* Nút điều hướng */}
            <div className="options">
                <input style={{ display: 'none' }} type="file" id="uploadVoice" onChange={handleUploadFile} />
                <label htmlFor="uploadVoice">
                    <div className="btn">{voice ? 'Upload Other Voice' : 'Upload Voice Now'}</div>
                </label>
            </div>
        </div>
    );
};

export default Experiment;
