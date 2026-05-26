import * as projectService from '../services/project.service.js';


export const getAll = async (req, res) => {
  const projects = await projectService.getAllProjects();
  res.json(projects);
};


export const getById = async (req, res) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id);
  res.json(project);
};


export const create = async (req, res) => {
  const Data = req.body;
  const newProject = await projectService.createNewProject(Data);
  
  // 201 : Code HTTP pour "projet créé amigo"
  res.status(201).json(newProject);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const success = await projectService.updateProject(id, req.body);
  
  res.json({ message: "Projet mis à jour avec succès !" });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const success = await projectService.deleteProject(id);
  
  res.json({ message: "Projet supprimé définitivement" });
};