import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicComponent } from './component/epic/epic.component';
import { EpicListComponent } from './component/epic-list/epic-list.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import * as fromEpic from './epic.reducer';
import {EpicRoutingModule} from "./epic-routing.module";
import {EpicEffects} from "./epic.effects";



@NgModule({
  declarations: [EpicComponent, EpicListComponent],
  imports: [
    CommonModule,
    EpicRoutingModule,
    StoreModule.forFeature(fromEpic.epicFeatureKey, fromEpic.reducer),
    EffectsModule.forFeature([EpicEffects]),
  ]
})
export class EpicModule { }
