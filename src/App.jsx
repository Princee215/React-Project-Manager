import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  const handleAddTask = (text) => {
    setProjectState(prevState => {
      const newTask = {
        text:text,
        projectId: prevState.selectedProjectId,
        id: Math.random()
      }

      return{
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: projectState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const handleSelectProject = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  }

  const handleStartAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }

  const handleCancelAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  const handleAddProject = (projectData) => {
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  const handleDeleteProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: projectState.projects.filter((project) => project.id !== projectState.selectedProjectId),
      };
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
  const selectedProjectTask = projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId);

  let content = <SelectedProject 
      project={selectedProject} 
      onDelete={handleDeleteProject} 
      onAddTask={handleAddTask} 
      onDeleteTask={handleDeleteTask}
      tasks={selectedProjectTask}
    />;

  if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject = {handleStartAddProject} />;
  }else if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onSelectProject={handleSelectProject} onStartAddProject = {handleStartAddProject} projects = {projectState.projects} selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
