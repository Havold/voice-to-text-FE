import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './experiment.scss';
import Button from '../../components/Button/Button';

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
    const location = useLocation();
    const queryClient = useQueryClient();
    const doneRef = useRef(false); // Biến tham chiếu kiểm tra trạng thái hoàn thành
    const [btnName, setBtnName] = useState('Train Again');
    const epoch = location.state ? Number(location.state.epoch) : -1;
    const jobId = localStorage.getItem('jobId');

    // Fetch dữ liệu của experiment mới nhất
    const { data: experiment, isLoading: isExperimentLoading } = useQuery({
        queryKey: ['latest_experiment'],
        queryFn: () => {
            if (!location.state || (location.state && doneRef.current === true)) {
                return fetchLatestExperiment();
            }
            return null;
        },
        initialData: [],
    });

    // Fetch tiến trình training nếu jobId tồn tại
    const { data: progress = [], refetch } = useQuery({
        queryKey: ['progress', jobId],
        queryFn: () => (location.state ? fetchProgress(jobId) : null),
        refetchInterval: doneRef.current ? 0 : 1000, // Nếu training chưa hoàn thành, fetch mỗi giây
        initialData: [],
    });

    // Mutation để invalid query khi training hoàn tất
    const mutation = useMutation({
        mutationFn: () => {},
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['latest_experiment'] }),
    });

    // Theo dõi tiến trình training, nếu hoàn thành thì cập nhật doneRef
    useEffect(() => {
        if (progress?.length === epoch) {
            doneRef.current = true;
            mutation.mutate();
        }
    }, [progress?.length, epoch]);

    // Cập nhật tên nút khi không có dữ liệu experiment
    useEffect(() => {
        if (!experiment) {
            setBtnName('Create new model now!');
        }
    }, [experiment]);

    if (isExperimentLoading) {
        return <p>Waiting for training progress...</p>;
    }

    return (
        <div className="experiment">
            <h1>
                {experiment?.accuracy || location.state
                    ? 'Latest Experiment Results'
                    : 'Oops! Looks like this is the first time you visit us.'}
            </h1>

            {/* Hiển thị thông số của thí nghiệm */}
            <div className="params">
                <span>Batch size: {experiment?.batch_size || location.state?.batch_size}</span>
                <span>Learning rate: {experiment?.lr || location.state?.lr}</span>
                <span>Epoch: {experiment?.epoch || location.state?.epoch}</span>
                <span>
                    Hidden Layer: [{experiment?.hidden01 || location.state?.hidden01},
                    {experiment?.hidden02 || location.state?.hidden02}]
                </span>
            </div>

            {/* Hiển thị vòng loading nếu đang training */}
            {progress?.length < epoch && <div className="loadingCircle"></div>}

            {/* Hiển thị tiến trình training */}
            {progress?.length > 0 && (
                <div className="progress">
                    <h2 className="progressTitle">Training Progress:</h2>
                    {progress.map((p, index) => (
                        <p key={index}>
                            Epoch {p.epoch}: Train Loss {p.train_loss.toFixed(4)}, Val Loss {p.val_loss.toFixed(4)}
                        </p>
                    ))}
                </div>
            )}

            {/* Hiển thị kết quả cuối cùng */}
            {experiment?.accuracy !== undefined && (
                <p className="completed">✅ Training Completed! Accuracy: {experiment.accuracy.toFixed(2)}</p>
            )}

            {/* Nút điều hướng */}
            <div className="options">
                <Button url="/history">History</Button>
                <Button url="/create">{btnName}</Button>
            </div>
        </div>
    );
};

export default Experiment;
