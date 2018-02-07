import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { FormDynamicComponent } from './form-dynamic/form-dynamic.component';
import { DynamicFormQuestionComponent } from './form-dynamic/dynamic-form-question.component';
import { HarperDbService } from './form-dynamic/service/harper-db.service'
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

@NgModule({
	imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
	declarations: [AppComponent,
	    FormDynamicComponent,
    	DynamicFormQuestionComponent],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [HarperDbService],
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() {}
}
