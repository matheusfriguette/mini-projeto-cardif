import { Grade } from '../../models/grade';

export namespace Grades {
  export class List {
    static readonly type = '[Grades] List';
    constructor() {}
  }

  export class GetOne {
    static readonly type = '[Grades] Get One';
    constructor(public id: number) {}
  }

  export class Register {
    static readonly type = '[Grades] Register';
    constructor(public grade: Grade) {}
  }

  export class Update {
    static readonly type = '[Grades] Update';
    constructor(public grade: Grade) {}
  }

  export class Delete {
    static readonly type = '[Grades] Delete';
    constructor(public id: number) {}
  }
}
