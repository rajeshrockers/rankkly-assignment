import React from 'react'
import { Link } from 'react-router-dom'

import BUTTON_TEXT from '../../constants/text'


export const TaskListItem = ({
    taskItem,
    handleRenderStatus,
    handleDeleteTasks,
    handleChangeStatus,
    renderDynamicStatusCss
}) => {
    return (
        <>
            <ol>
                {taskItem?.map((item) => (
                    <li key={item?.id}>
                        <div className='tasks-list'>
                            <div className='mobile-header-name'>
                                <h1>Task Name</h1>
                                <Link className='task-name' to={`/task/${item?.id}`}>
                                    {item?.todo}
                                </Link>
                            </div>
                            <div className='mobile-header-name'>
                                <h1>Status</h1>
                                <h2 style={renderDynamicStatusCss(item)}>
                                    {handleRenderStatus(item)}
                                </h2>
                            </div>
                            <div className='mobile-header-name'>
                                <h1>Action</h1>
                                <button className='delete-task-btn' onClick={() => handleDeleteTasks(item)}>
                                    {BUTTON_TEXT.DELETE}
                                </button>
                            </div>
                            <div className='mobile-header-name'>
                            <div className='status-change-option'>
                                <h1>Change Status</h1>
                                <select id="simple-select" onChange={(event) => handleChangeStatus(event, item)} value={item?.completed}>
                                    <option value="false">To Do</option>
                                    <option value="Newly added">In Progress</option>
                                    <option value="true">Done</option>
                                </select>
                            </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </>
    )
}
