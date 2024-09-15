import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { TaskListItem } from './TaskListItem'

const TaskList = ({
    taskItem,
    handleDeleteTasks,
    handleChangeStatus,
    handleRenderStatus,
    totalLength,
    fetchData,
    limit,
    renderDynamicStatusCss,
}) => {
    return (
        <div>
            <div className='heading-name'>
                <h1>TasksList</h1>
            </div>
            <div>
                <ol style={{ listStyle: 'none' }}>
                    <li>
                        <div className='tasks-list-header'>
                            <h1>Task Name</h1>
                            <h1>Status</h1>
                            <h1>Action</h1>
                            <h1>Change Status</h1>
                        </div>
                    </li>
                </ol>
                <div>
                    <InfiniteScroll
                        dataLength={limit}
                        next={fetchData}
                        hasMore={limit < totalLength}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>You have reached the end!</b>
                            </p>
                        }
                    >
                        <TaskListItem
                            taskItem={taskItem}
                            handleRenderStatus={handleRenderStatus}
                            handleDeleteTasks={handleDeleteTasks}
                            handleChangeStatus={handleChangeStatus}
                            renderDynamicStatusCss={renderDynamicStatusCss}
                        />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}

export default TaskList
