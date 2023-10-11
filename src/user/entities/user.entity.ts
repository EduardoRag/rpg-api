import { Character } from 'src/characters/entities/character.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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