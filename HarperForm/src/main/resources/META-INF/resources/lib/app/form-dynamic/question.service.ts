import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './dynamicQuestions/question-dropdown';
import { QuestionBase }     from './dynamicQuestions/question-base';
import { TextboxQuestion }  from './dynamicQuestions/question-textbox';
import { RadioButtons }  from './dynamicQuestions/question-radiogroup';

declare const themeDisplay: any;

@Injectable()
export class QuestionService {
  accountId : string;
  companyId : string;
  QuestionService(){
   
  }

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {

    this.accountId = themeDisplay.getUserId();
    this.companyId = themeDisplay.getCompanyId();
    console.log(this.accountId + " " + this.companyId);

    let questions: QuestionBase<any>[] = [

      

      new TextboxQuestion({
        key: 'membershipnumber',
        label: 'Membership Number',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'height',
        label: 'Height in Ft',
        type: 'text',
        order: 2
      }),

      new TextboxQuestion({
        key: 'weight',
        label: 'Weight in pounds',
        type: 'text',
        order: 3
      }),

      new DropdownQuestion({
        key: 'maritalstatus',
        label: 'Marital Status',
        options: [
          {key: 'married',  value: 'Married'},
          {key: 'single',  value: 'Single'},
          {key: 'widowed',   value: 'Widowed'},
          {key: 'divorced', value: 'Divorced'}
        ],
        order: 4
      }),

      new RadioButtons({
        key: 'peanut',
        label: 'Peanut Allergy',
        type: 'radio',
        value: 'no',
        order: 5
      }),

      new RadioButtons({
        key: 'milk',
        label: 'Milk Allergy',
        type: 'radio',
        value: 'no',
        order: 6
      }),

      new RadioButtons({
        key: 'soy',
        label: 'Soy Allergy',
        type: 'radio',
        value: 'no',
        order: 7
      }),

      new RadioButtons({
        key: 'fish',
        label: 'Fish Allergy',
        type: 'radio',
        value: 'no',
        order: 8
      }),

      new TextboxQuestion({
        key: 'userid',
        label: '',
        type: 'hidden',
        value: this.accountId,
        order: 9 
      }),

      new TextboxQuestion({
        key: 'companyid',
        label: '',
        type: 'hidden',
        value: this.companyId,
        order: 10 
      })

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}