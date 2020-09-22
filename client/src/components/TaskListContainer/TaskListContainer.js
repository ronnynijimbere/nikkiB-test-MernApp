import React from "react";
//Styles Import
import "../../App.css";
import "./TaskList.css";
import Col from "react-bootstrap/Col";
//Component Import
import TaskTable from "../TaskTable/TaskTable";
import MoreMenu from "./MoreMenu.js";
import CreateTaskModal from "./CreateTaskModal.js";

export default function TaskListContainer({
  taskLists,
  handleAddTask,
  handleDeleteTask,
  handleDeleteTaskList,
  handleEditList,
  handleEditTask,
}) {
  return taskLists.map((taskList) => (
    <Col className="taskListContainer" key={taskList._id}>
      <div className="topTaskContainer">
        <div className="taskListHeader">
          <h2>{taskList.listName}</h2>
          <MoreMenu
            taskListId={taskList._id}
            taskListName={taskList.listName}
            handleDeleteTaskList={handleDeleteTaskList}
            handleEditList={handleEditList}
          />
        </div>
        <hr />
        <TaskTable
          listItems={taskList.listItems}
          taskListId={taskList._id}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
      </div>
      <div className="btnDiv">
        <CreateTaskModal
          handleAddTask={handleAddTask}
          taskListId={taskList._id}
        />
      </div>
    </Col>
  ));
}
