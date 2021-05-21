/* eslint-disable prettier/prettier */
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    findByLicensePlate(license_plate: string): Promise<Car>;
    // list(): Promise<Catr[]>;
    create(data: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository, ICreateCarDTO };