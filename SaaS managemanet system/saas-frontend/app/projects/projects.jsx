import { useEffect, useState } from "react";
import api from "../../lib/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects/organization/1/")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Projects</h1>

          {projects.map(project => (
            <div key={project.id} className="bg-white shadow p-4 mb-3 rounded">
              <h2 className="font-semibold">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
