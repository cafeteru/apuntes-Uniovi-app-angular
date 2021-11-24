import { SubjectType } from './enums/subject-type';

export class Subject {
  constructor(
    public id: number = undefined,
    public name: string = undefined,
    public subjectType: SubjectType = SubjectType.BASIC,
    public active: boolean = true
  ) {}
}
