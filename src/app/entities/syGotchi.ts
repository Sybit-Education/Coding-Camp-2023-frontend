import {Eye} from "../enums/eye.enum";
import {Shape} from "../enums/shape.enum";
import {Mood} from "../enums/mood.enum";

export interface SyGotchi {
  id: string,
  name: string,
  rank: number,
  createdAt: string,
  diedAt: string,
  score: number,
  mood: Mood,
  color: string,
  eyes: Eye,
  shape: Shape,
  height: number,
  width: number,
  owner: {
    id: string,
    username: string
  },
  hunger: number,
  thirst: number,
  bored: number,
  tired: number,
  dirty: number,
  feedCooldown: number,
  drinkCooldown: number,
  playCooldown: number,
  hungerDeathIn: number,
  thirstDeathIn: number,
  boredDeathIn: number,
  startedSleeping: string,
  dead: boolean,
  sleeping: boolean
}
