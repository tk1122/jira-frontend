import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicComponent } from './component/epic/epic.component';
import { EpicListComponent } from './component/epic-list/epic-list.component';



@NgModule({
  declarations: [EpicComponent, EpicListComponent],
  imports: [
    CommonModule
  ]
})
export class EpicModule { }
