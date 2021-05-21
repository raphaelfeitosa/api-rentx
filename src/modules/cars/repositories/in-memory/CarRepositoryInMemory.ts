/* eslint-disable prettier/prettier */

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate }: ICreateCarDTO): Promise<Car> {

        const car = new Car();

        Object.assign(car, {
            brand, category_id, daily_rate, description, fine_amount, name, license_plate
        })

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {

        return this.cars.find((car) => car.license_plate === license_plate);
    }

    // async list(): Promise<Category[]> {

    //     const categories = this.categories;
    //     return categories;
    // }

    // async findByName(name: string): Promise<Category> {

    //     const category = this.categories.find((category) => category.name === name);

    //     return category;
    // }
}

export { CarsRepositoryInMemory }