import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FiletreeComponent } from './filetree/filetree.component';
import { NodeService } from './node.service';
import { FilePreviewComponent } from './file-preview/file-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    FiletreeComponent,
    FilePreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [NodeService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
