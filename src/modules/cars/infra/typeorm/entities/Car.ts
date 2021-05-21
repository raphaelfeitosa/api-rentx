import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity("cars")
class Car {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    brand: string;

    @Column()
    fine_amount: number;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {

        if (!this.id) {

            this.id = uuidv4();
            this.available = true;
            this.created_at = new Date();
        }
    }
}

export { Car };