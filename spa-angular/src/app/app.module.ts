import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FiletreeComponent } from './filetree/filetree.component';
import { NodeService } from './node.service';


@NgModule({
  declarations: [
    AppComponent,
    FiletreeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
