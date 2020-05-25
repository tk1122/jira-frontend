import {createFeatureSelector, createSelector} from "@ngrx/store";
import {projectEntityAdapter, projectFeatureKey, ProjectState} from "./project.reducer";

const selectProjectState = createFeatureSelector<ProjectState>(projectFeatureKey);

export const projects = createSelector(selectProjectState, projectEntityAdapter.getSelectors().selectAll)

export const isProjectsLoaded = createSelector(selectProjectState, projectState => projectState.isProjectsLoaded)

export const projectSelectedId = createSelector(selectProjectState, projectState => projectState.selectedProjectId)

export const projectSelected = createSelector(projects,  projectSelectedId, (projects,id)=> {
  if (id) {
    return projects.find(x => x.id === id)
  }
})

