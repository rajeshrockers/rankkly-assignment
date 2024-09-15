import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'

import TaskList from './TaskList'
import APIPATH from '../../constants/api'
import AddNewTaskBtn from './AddNewTaskBtn'
import NUMBERS from '../../constants/numbers'
import MESSAGES from '../../constants/message';
import { startLoading, stopLoading } from '../../redux/feature/loaderSlice'

const TaskMainApp = () => {
    const dispatch = useDispatch()
    let totalLength = useRef(null);
    let currentPage = useRef(NUMBERS.ONE);
    const [limit, setLimit] = useState(NUMBERS.ZERO)
    const [taskItem, setTaskItem] = useState([])
    const [newTaskText, setNewTaskText] = useState('')
    const [showAddNewTaskDiv, setShowAddNewTaskDiv] = useState(false)


    // this function is used to add new tasks to user task list
    const handleAddNewTask = async () => {
        const payload = {
            todo: newTaskText,
            completed: false,
            userId: taskItem.length + NUMBERS.ONE,
        }
        const headers = { 'Content-Type': 'application/json' }

        if (newTaskText === '') {
            toast.error(MESSAGES.TASK_NAME_VALIDATION)
        } else {

            try {
                const response = await axios.post(APIPATH.ADD_NEW_TASK, payload, {
                    headers,
                })

                toast.success(MESSAGES.TASK_ADD_SUCCESS)
                setTaskItem([...taskItem, {
                    completed: 'Newly added',
                    id: response?.data?.id,
                    todo: response?.data?.todo,
                    userId: response?.data?.userId,
                }])
                setShowAddNewTaskDiv(false)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    // this function is used to edit tasks of user task list
    const handleEditTasks = async (item, completed) => {
        const payload = {
            completed,
        }
        const headers = { 'Content-Type': 'application/json' }
        try {
            await axios.put(`${APIPATH.EDIT_TASK}${item?.id}`, payload, {
                headers,
            })
            toast.success(MESSAGES.TASK_EDIT_SUCCESS)
        } catch (error) {
            console.error('Error:', error);
        }
    }


    // this function is used to delete tasks of user task list
    const handleDeleteTasks = async (item) => {
        try {
            await axios.delete(`${APIPATH.DELETE_TASK}${item?.id}`)
            toast.success(MESSAGES.TASK_DELETE_SUCCESS)
            setTaskItem(prevItems => prevItems.filter(filterItem => filterItem.id !== item.id))
        } catch (error) {
            console.error('Error:', error);
        }
    }


    // this function is used to change status of tasks
    const handleChangeStatus = (event, item) => {
        const currentStatus = event.target.value
        if (currentStatus === 'false') {
            handleEditTasks(item, false)
            setTaskItem((prevItems) =>
                prevItems.map(task =>
                    task.id === item.id ? { ...task, completed: false } : task
                ))
        } else if (currentStatus === 'true') {
            handleEditTasks(item, true)
            setTaskItem((prevItems) =>
                prevItems.map(task =>
                    task.id === item.id ? { ...task, completed: true } : task
                ))
        } else {
            setTaskItem((prevItems) =>
                prevItems.map(task =>
                    task.id === item.id ? { ...task, completed: 'Newly added' } : task
                ))
            toast.success("Task Edited Successfully!")
        }
    }


    // this function is used to render status text of tasks according to completed status
    const handleRenderStatus = (item) => {
        if (item.completed === 'Newly added') {
            return 'In Progress'
        } else if (!item.completed) {
            return 'To Do'
        } else if (item.completed) {
            return 'Done'
        }
    }

    // this function is used to fetch more taks list using API
    const fetchApiData = async () => {
        try {
            const taskData = await axios.get(`${APIPATH.TASK_LIST}?limit=${NUMBERS.TEN}&skip=${limit}`);
            setTaskItem([...taskItem, ...taskData?.data?.todos]);
            currentPage.current += NUMBERS.ONE
            setLimit(currentPage.current * NUMBERS.TEN)
            totalLength.current = taskData?.data?.total
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const renderDynamicStatusCss = (item) => {
        if (item.completed === 'Newly added') {
            return { color: '#966CE4' }
        } else if (!item.completed) {
            return { color: 'red' }
        } else if (item.completed) {
            return { color: 'green' }
        }
    }

    // this function is used to render and fetch api call for task item
    useEffect(() => {
        const fetchTaskApi = async () => {
            dispatch(startLoading()); // Start the loader
            try {
                const taskData = await axios.get(`${APIPATH.TASK_LIST}?limit=${NUMBERS.TEN}&skip=0`);
                setTaskItem(taskData?.data?.todos);
                setLimit(NUMBERS.TEN)
                totalLength.current = taskData?.data?.total
            } catch (error) {
                console.error('Error:', error);
            } finally {
                  dispatch(stopLoading()); // Stop the loader
            }
        };
        fetchTaskApi()
    }, [dispatch])
    return (
        <div>
            <AddNewTaskBtn
                setShowAddNewTaskDiv={setShowAddNewTaskDiv}
                showAddNewTaskDiv={showAddNewTaskDiv}
                setNewTaskText={setNewTaskText}
                handleAddNewTask={handleAddNewTask}
            />
            <TaskList
                taskItem={taskItem}
                handleDeleteTasks={handleDeleteTasks}
                handleChangeStatus={handleChangeStatus}
                handleRenderStatus={handleRenderStatus}
                totalLength={totalLength?.current}
                fetchData={fetchApiData}
                limit={limit}
                renderDynamicStatusCss={renderDynamicStatusCss}
            />
        </div>
    )
}

export default TaskMainApp
