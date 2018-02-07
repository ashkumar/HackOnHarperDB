import { QuestionBase } from './question-base';

export class RadioButtons extends QuestionBase<string> {
  controlType = 'radioGroup';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}