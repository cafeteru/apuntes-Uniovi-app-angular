import { SubjectType } from './enums/subject-type';

export class Subject {

  constructor(
    public id: number = undefined,
    public name: string = '',
    public subjectType: SubjectType = undefined,
    public active: boolean = true
  ) {
  }

}
