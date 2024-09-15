import React from 'react'

import BUTTON_TEXT from '../../constants/text'
import AddTask from '../../assests/images/add-task.png'


const AddNewTaskBtn = ({
    showAddNewTaskDiv,
    setShowAddNewTaskDiv,
    setNewTaskText,
    handleAddNewTask
}) => {
    return (
        <>
            <div className='add-task-img-cont'>
                <img onClick={() => setShowAddNewTaskDiv(!showAddNewTaskDiv)} className='add-task-btn' src={AddTask} alt="addTask" />
            </div>
            {showAddNewTaskDiv &&
                (<div className='add-task-input'>
                    <input placeholder='Enter tasks name...' onChange={(e) => setNewTaskText(e.target.value)} />
                    <button className='save-task-btn' onClick={() => handleAddNewTask()}>
                        {BUTTON_TEXT.SAVE}
                    </button>
                    <button className='cancel-task-btn' onClick={() => setShowAddNewTaskDiv(false)}>
                        {BUTTON_TEXT.CANCEL}
                    </button>
                </div>)}
        </>
    )
}

export default AddNewTaskBtn