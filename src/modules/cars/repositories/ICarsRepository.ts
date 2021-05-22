/* eslint-disable prettier/prettier */
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    findAllAvailableCars(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
    create(data: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository, ICreateCarDTO };