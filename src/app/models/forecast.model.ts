export class Forecast {
    constructor(
        public coord: { lon: number, lat: number },
        public weather: [{ id: number, main: string, description: string, icon: string }],
        public main: { temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number },
        public visibility: number,
        public wind: { speed: number },
        public dt: number,
        public sys: { country: string, sunrise: number, sunset: number },
        public id: number,
        public name: string
    ) { }
}