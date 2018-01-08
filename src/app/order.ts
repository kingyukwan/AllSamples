export class Order {
    constructor(
        public num: string,
        public date: string,
        public requiredDate: string,
        public shippedDate: string,
        public itemQty: string,
        public status: string,
        public remarks: string
      ) { }
}
