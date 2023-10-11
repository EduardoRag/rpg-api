import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface ClassSkills {
    name: string;
    description: string;
    mana?: number;
    damage?: string;
}

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false,
        unique: true
    })
    class: string;

    @Column('int', { nullable: false })
    health: number;

    @Column('int', { nullable: false })
    mana: number;

    @Column('simple-json', {
        array: true,
        default: [],
        nullable: false
    })
    classSkills: ClassSkills[];

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
}