import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [ projectState, setProjectState ] = useState({
    projects: [],
    tasks: [],
    selectedProjectId: undefined, // doing nothing state
  });

  function handleAddTask(text) {
    setProjectState( prevState => {
      const taskId = Math.random();
      const newTask = { text, id: taskId, projectId: prevState.selectedProjectId };
    
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
    };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState( prevState => ({
      ...prevState,
      tasks: prevState.tasks.filter(task => task.id !== taskId),
    }));
  }

  function handleStartAddProject() {
    setProjectState( prevState => ({
      ...prevState,
      selectedProjectId: null, // adding new project state
    }));
  }

  function handleCancelAddProject() {
    setProjectState( prevState => ({
      ...prevState,
      selectedProjectId: undefined, // doing nothing state
    }));
  }

  function handleSelectProject(projectId) {
    setProjectState( prevState => ({
      ...prevState,
      selectedProjectId: projectId,
    }));
  }

  function onProjectDelete() {
    setProjectState( prevState => ({
      ...prevState,
      projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
      selectedProjectId: undefined, // reset to doing nothing state
    }));
  }

  function handleAddProject(projectData) {
    setProjectState( prevState => {
      const projectId = Math.random();
      return {
        ...prevState,
        projects: [...prevState.projects, {...projectData, id: projectId}],
        selectedProjectId: undefined, //
      };
    });
  }
  
  const selectedProject = projectState.projects.find(project => 
    project.id === projectState.selectedProjectId
  );

  const tasksForSelectedProject = projectState.tasks.filter(task => 
    task.projectId === projectState.selectedProjectId
  );

  let content = <SelectedProject 
    project={selectedProject}
    onDelete={onProjectDelete}
    tasks={tasksForSelectedProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}/>;

  if(projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
