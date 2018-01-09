export class User {
    constructor(
        public num: string,
        public name: string,
        public contactLastName: string,
        public contactFirstName: string,
        public phone: string,
        public addressLine1: string,
        public addressLine2: string,
        public city: string,
        public email: string,
        public gender: string,
        public creditLimit: string,
        public updateDate: Date
      ) { }
}
