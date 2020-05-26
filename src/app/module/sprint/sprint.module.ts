import {reducer, sprintFeatureKey} from "./sprint.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {NgModule} from "@angular/core";
import {SprintRoutingModule} from "./sprint-routing.module";
import {SprintEffects} from "./sprint.effect";
import { SprintComponent } from './component/sprint/sprint.component';


@NgModule({
  declarations: [SprintComponent],
  imports: [
    CommonModule,
    SprintRoutingModule,
    StoreModule.forFeature(sprintFeatureKey, reducer),
    EffectsModule.forFeature([SprintEffects]),

  ]
})
export class SprintModule {
}
