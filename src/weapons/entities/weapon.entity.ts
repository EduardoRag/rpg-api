import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weapon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false,
        unique: true
    })
    weapon: string;

    @Column('text', {
        nullable: false
    })
    damage: string;

    @Column('text', {
        nullable: false
    })
    critical: string;
}