import {Column, Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType() //đánh dáu là objectType của graphql
@Entity() //entity trong typeorm
export class User extends  BaseEntity{

    @PrimaryGeneratedColumn()
    @Field(_type => ID) //đánh dấu trả về cho response
    id: number;

    @Column({ unique:true })
    @Field(_type => String)
    username: string;

    @Column()
    @Field()
    email!: string;

    @Column()
    password: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @CreateDateColumn()
    @Field()
    updatedAt: Date;

}

