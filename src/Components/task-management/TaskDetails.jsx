import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { startLoading, stopLoading } from '../../redux/feature/loaderSlice';

const TaskDetails = () => {
    let { id } = useParams();
    const dispatch = useDispatch()
    const [taskDetail, setTaskDetail] = useState('')

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                dispatch(startLoading()); // Stop the loader
                const response = await axios.get(`https://dummyjson.com/todos/${id}`)
                setTaskDetail(response?.data)
            } catch (error) {
                console.error('Error fetching task data:', error);
            } finally {
                dispatch(stopLoading()); // Stop the loader
            }
        }
        fetchTaskDetails()
    }, [id, dispatch])
    return (
        <div>
            <h1 style={{
                color: 'yellowgreen', textTransform: 'upperCase', fontSize: '50px',
                textAlign: 'center'
            }}>TaskDetails</h1>
            <div className='tasks-details'>
                <h4 style={{ width: '400px' }}>Todo: <p>{taskDetail?.todo}</p></h4>
                <h4>Id: <p>{taskDetail?.id}</p></h4>
                <h4>UserId: <p>{taskDetail?.userId}</p></h4>
                <h4>Completed: <p>{taskDetail?.completed ? 'true' : 'false'}</p></h4>
            </div>
        </div>
    )
}

export default TaskDetails