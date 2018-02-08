import { Component } from '@angular/core';
import { QuestionService } from './form-dynamic/question.service';



@Component({
	template: `
    <h1>{{title}}</h1>
    <app-form-dynamic [questions]="questions"></app-form-dynamic>
    `,
    providers:  [QuestionService],
})
export class AppComponent {
	title = 'Patient Attribute Form';
	questions: any[];
	constructor(service: QuestionService) {
	   this.questions = service.getQuestions();
	}
	
}
