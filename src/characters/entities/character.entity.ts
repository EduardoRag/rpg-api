import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

enum ArmorType {
    LIGHT = 'light',
    MEDIUM = 'meidum',
    HEAVY = 'heavy'
}

enum RaceType {
    HUMAN = 'human',
    ELF = 'elf',
    DWARF = 'dwarf'
}

enum ClassType {
    MAGE = 'mage',
    ROGUE = 'rogue',
    WARRIOR = 'warrior'
}

interface Skills {
    classSkills: string[];
    raceSkills: string[];
}

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    name: string;

    @Column('enum', {
        enum: RaceType,
        nullable: false
    })
    race: RaceType;

    @Column('enum', {
        enum: ClassType,
        nullable: false
    })
    class: ClassType;

    @Column('int', { nullable: false })
    strength: number;

    @Column('int', { nullable: false })
    dexterity: number;

    @Column('int', { nullable: false })
    constitution: number;

    @Column('int', { nullable: false })
    intelligence: number;

    @Column('int', { nullable: false })
    wisdom: number;

    @Column('int', { nullable: false })
    charisma: number;

    @Column('int', { nullable: false })
    health: number;

    @Column('int', { nullable: false })
    mana: number;

    @Column('int', { nullable: false })
    armorClass: number;

    @Column('jsonb', { nullable: false })
    skills: Skills;

    @Column('simple-array', {
        array: true,
        nullable: false
    })
    weapons: string[];

    @Column('enum', {
        enum: ArmorType,
        nullable: false,
        default: ArmorType.LIGHT
    })
    armorType: ArmorType;

    @ManyToOne(() => User, (user) => user.characters)
    user: User;
}