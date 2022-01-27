import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'
import {Field, ObjectType} from "type-graphql";

@ObjectType() //đánh dáu là objectType của graphql
@Entity()
export class Post extends  BaseEntity{
    @PrimaryGeneratedColumn()
    @Field()
    id!: number;

    @Column()
    @Field()
    title!: string;

    @Column()
    @Field()
    text!: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @CreateDateColumn()
    @Field()
    updatedAt: Date;
}