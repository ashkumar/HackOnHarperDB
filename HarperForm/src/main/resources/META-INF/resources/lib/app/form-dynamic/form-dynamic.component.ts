import { Component, Input, OnInit, ElementRef }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { QuestionBase }              from './dynamicQuestions/question-base';
import { QuestionControlService }    from './dynamicQuestions/question-control.service';
import { HarperDbService } from './service/harper-db.service'
 

@Component({
  selector: 'app-form-dynamic',
  template: `
    <div>
      <form (ngSubmit)="onSubmit()" [formGroup]="form">
    
        <div *ngFor="let question of questions" class="form-row">
          <app-question [question]="question" [form]="form"></app-question>
        </div>
    
        <div class="form-row">
          <button type="submit" [disabled]="!form.valid">Submit</button>
          <button type="submit">Save</button>
        </div>
      </form>
    
      <div *ngIf="payLoad" class="form-row">
        <strong>Saved the following values</strong><br>{{payLoad}}
      </div>
    </div>
  `,
  providers: [ QuestionControlService, HarperDbService ]
})
export class FormDynamicComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  resURL : string;
 
  constructor(private qcs: QuestionControlService, private hdb: HarperDbService, private elementRef: ElementRef) { 
      this.getResourceURL();
      hdb.setResourceURL(this.resURL);
  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.hdb.getInitialFormValue(this.form.value.userid).subscribe(data => {
      const formVal = JSON.stringify(data);
      if (data.length == 1){
        this.form.patchValue(data[0], {onlySelf: true});
      }
    });
    
  }

  getResourceURL() : void {
		this.resURL = this.elementRef.nativeElement.parentNode.getAttribute('resurl');	
	}
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    let valid = this.form.valid;
    this.hdb.saveForm(this.payLoad, valid).subscribe(data => {
      console.log(data);
    });
  }

}
