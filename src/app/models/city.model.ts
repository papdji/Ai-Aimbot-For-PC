export class City {
    constructor(
        public id: number,
        public name: string,
        public country: string,
        public coords: { lon: number, lat: number }
    ) { }
}