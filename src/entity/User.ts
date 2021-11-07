import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm";

import { Achievement } from './Achievement';

@Entity()
class User {

  @PrimaryColumn()
  id: number;

  @ManyToMany(() => Achievement)
  @JoinTable()
  achievements: Achievement[]
}

export default User;

