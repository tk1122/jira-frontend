import {createFeatureSelector, createSelector} from "@ngrx/store";
import {projectEntityAdapter, projectFeatureKey, ProjectState} from "./project.reducer";

const selectProjectState = createFeatureSelector<ProjectState>(projectFeatureKey);

const selectProjects = createSelector(selectProjectState, projectEntityAdapter.getSelectors().selectAll)

export const ProjectSelectors = {selectProjects}
