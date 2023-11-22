import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

function App() {
  const today = new Date().toISOString().split("T")[0];
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completionDate: today,
    priority: "Medium",
    editing: false,
    id: null,
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (newTask.title) {
      if (newTask.editing) {
        setTasks(
          tasks.map((task) =>
            task.id === newTask.id
              ? { ...newTask, editing: false, id: task.id }
              : task
          )
        );
        toast.success("Task updated!");
      } else {
        setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
        toast.success("Task added!");
      }
      setNewTask({
        title: "",
        description: "",
        completionDate: today,
        priority: "Medium",
        editing: false,
        id: null,
      });
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task deleted!");
  };

  const toggleTaskDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task marked as complete!");
  };

  const startEdit = (task) => {
    setNewTask({ ...task, editing: true });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return task.priority === filter;
  });

  const renderTaskInput = (placeholder, value, onChange, type = "text") => (
    <input
      type={type}
      className="p-2 bg-[#040D12] border border-gray-300 rounded w-full mb-2 text-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );

  return (
    <div className="bg-[#040D12] min-h-screen text-white">
      <header className="py-4 text-center">
        <h1 className="text-3xl font-bold">TaskEase</h1>
        <p className="text-lg">Organize your tasks effortlessly</p>
      </header>

      <div className="container mx-auto p-4 max-w-lg">
        <div className="mb-4">
          {renderTaskInput("Title", newTask.title, (e) =>
            setNewTask({ ...newTask, title: e.target.value })
          )}
          {renderTaskInput("Description", newTask.description, (e) =>
            setNewTask({ ...newTask, description: e.target.value })
          )}
          {renderTaskInput(
            "Completion Date",
            newTask.completionDate,
            (e) => setNewTask({ ...newTask, completionDate: e.target.value }),
            "date"
          )}

          <select
            className="p-2 bg-[#040D12] border border-gray-300 rounded w-full mb-2 text-white"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            className="px-4 py-2 bg-blue-500 w-full rounded"
            onClick={addOrUpdateTask}
          >
            {newTask.editing ? "Update Task" : "Add Task"}
          </button>
        </div>

        <div className="mb-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded w-full bg-[#040D12] text-white"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`p-2 border border-gray-300 rounded mb-2 ${
                task.completed ? "bg-green-600" : "bg-white text-black"
              }`}
            >
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>
                Due: {task.completionDate} | Priority: {task.priority}
              </p>
              <div className="flex items-center justify-end">
                <button
                  className="ml-2"
                  onClick={() => toggleTaskDone(task.id)}
                >
                  <FaCheck title="Mark as Complete" />
                </button>
                <button className="ml-2" onClick={() => startEdit(task)}>
                  <FaEdit title="Edit Task" />
                </button>
                <button className="ml-2" onClick={() => deleteTask(task.id)}>
                  <FaTrash title="Delete Task" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <Toaster position="top-center" />
      </div>
    </div>
  );
}

export default App;
