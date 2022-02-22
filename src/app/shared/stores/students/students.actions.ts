import { Student } from '../../models/student';

export namespace Students {
  export class List {
    static readonly type = '[Students] List';
    constructor() {}
  }

  export class GetOne {
    static readonly type = '[Students] Get One';
    constructor(public id: number) {}
  }

  export class Register {
    static readonly type = '[Students] Register';
    constructor(public student: Student) {}
  }

  export class Update {
    static readonly type = '[Students] Update';
    constructor(public student: Student) {}
  }

  export class Delete {
    static readonly type = '[Students] Delete';
    constructor(public id: number) {}
  }
}
