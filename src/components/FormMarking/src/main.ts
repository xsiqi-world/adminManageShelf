import inputComp from './inputComp';
export class main {
  subs = [];
  constructor() {
    this.subs.push(new inputComp());
  }
}