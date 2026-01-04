import { useEffect, useState } from "react";
import api from "../lib/api";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("tasks/")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Tasks</h1>

          {tasks.map(task => (
            <div key={task.id} className="bg-white shadow p-4 mb-3 rounded">
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <span className="text-sm text-blue-600">{task.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
