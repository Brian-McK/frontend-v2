import { ApiResponse, get } from "./api";

export interface ISkill {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface SkillsArray extends Array<ISkill> {
  status: number;
}

export async function getAllSkills(): Promise<SkillsArray> {
  try {
    const skillsResponse = await get<SkillsArray>("/skilllevels");

    console.log(skillsResponse);

    return skillsResponse;
  } catch (error) {
    console.error("Error fetching skills: ", error);
    throw error;
  }
}
