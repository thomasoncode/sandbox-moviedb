export class Movie {
    constructor(
        readonly title: string,
        readonly description: string,
        readonly id: number,
        private readonly durationInMinutes: number
    ) {}

    get duration(): string {
        if (this.durationInMinutes === null) {
            return '';
        }

        const minutes = this.durationInMinutes % 60;
        const hours = (this.durationInMinutes - minutes) / 60;
        return `${hours}h ${minutes}m`;
    }
}
