import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface RaceSkills {
    name: string;
    description: string;
    mana?: number;
    damage?: string;
}

@Entity()
export class Race {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false,
        unique: true
    })
    race: string;

    @Column('int', { nullable: true })
    strength: number;

    @Column('int', { nullable: true })
    dexterity: number;

    @Column('int', { nullable: true })
    constitution: number;

    @Column('int', { nullable: true })
    intelligence: number;

    @Column('int', { nullable: true })
    wisdom: number;

    @Column('int', { nullable: true })
    charisma: number;

    @Column('simple-json', {
        array: true,
        default: [],
        nullable: false
    })
    raceSkills: RaceSkills[];
}