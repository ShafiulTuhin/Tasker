import React, { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddModal from "./AddModal";
import NoTask from "./NoTask";

const TaskBoard = () => {
  const defaultTask = [
    {
      id: crypto.randomUUID(),
      title: "Learn React JS as front-end language",
      description:
        "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.",
      tags: ["React", "Redux", "firebase"],
      priority: "Medium",
      isFavorite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Mern Stack lagnuage",
      description:
        "The MERN stack is a collection of technologies that help developers build robust and scalable web applications using JavaScript. The acronym “MERN” stands for MongoDB, Express, React, and Node.",
      tags: ["NodeJs", "Mongo-DB"],
      priority: "High",
      isFavorite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Javascript the ultimate foundation of web application",
      description:
        "JavaScript References. W3Schools maintains a complete JavaScript reference, including all HTML and browser objects. ",
      tags: ["NodeJs", "Mongo-DB"],
      priority: "High",
      isFavorite: false,
    },
  ];
  const [tasks, setTasks] = useState(defaultTask);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) return newTask;
          return task;
        })
      );
    }

    setShowAddModal(false);
  };
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };
  const handleCLoseModal = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };
  const handleDeleteTask = (taskID) => {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskID);
    setTasks(taskAfterDelete);
  };
  const handleAllDeleteClick = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };
  const handleFavorite = (taskID) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskID);

    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setTasks(newTask);
  };
  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filtered]);
  };

  return (
    <section className="mb-20">
      {showAddModal && (
        <AddModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onClose={handleCLoseModal}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            modal={() => setShowAddModal(!showAddModal)}
            onDeleteAll={handleAllDeleteClick}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTask />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
