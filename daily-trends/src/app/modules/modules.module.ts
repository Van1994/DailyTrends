import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAIN_ROUTE } from './modules.route';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(MAIN_ROUTE),
    MessagesModule
  ]
})

export class ModulesModule {}
