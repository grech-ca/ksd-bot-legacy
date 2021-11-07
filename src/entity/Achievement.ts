import { Entity, Column, PrimaryColumn } from 'typeorm';

enum AchievementDifficulty {
  Easy,
  Medium,
  Hard,
  Legendary,
  Impossible,
}

@Entity()
export class Achievement {

  @PrimaryColumn({
    length: 50,
  })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  goal: number;

  @Column({
    type: 'enum',
    enum: AchievementDifficulty,
    default: AchievementDifficulty.Medium,
  })
  difficulty: AchievementDifficulty;
}
