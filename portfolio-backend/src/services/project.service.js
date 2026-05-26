import Project from '../models/project.model.js'; 
import AppError from '../errors/AppError.js';

export const getAllProjects = async () => {
  return await Project.findAll();
};

export const getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError("Ce projet n'existe pas", 404);
  }
  return project;
};

export const createNewProject = async (Data) => {
  const projectId = await Project.create(Data);
  if (!projectId) {
    throw new AppError("Erreur lors de la création du projet", 500);
  }
  return await Project.findById(projectId);
};

export const updateProject = async (id,Data) => {
  if (!updateProject ) {
    throw new AppError("Erreur lors de la mise a jour du projet", 500); // si la ligne  n'est pas midifié, c'est pas true mais bien false
  }
  return await Project.update(id, Data); // 
};

export const deleteProject = async (id) => {
  if (!deleteProject) {
    throw new AppError("Erreur lors de la suppression du projet", 500);
  }
  return await Project.delete(id);
};  