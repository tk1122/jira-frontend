import {MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';

export const metaReducers: MetaReducer[] = !environment.production ? [] : [];

