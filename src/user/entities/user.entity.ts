import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../../characters/entities/character.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false,
        unique: true
    })
    username: string;

    @Column('text', { nullable: false })
    password: string;

    @OneToMany(() => Character, character => character.user)
    characters: Character[];
}