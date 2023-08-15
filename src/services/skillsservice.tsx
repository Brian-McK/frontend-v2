import { ApiResponse, get, post } from "./api";

export interface ISkill {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface SkillsArray extends Array<ISkill> {
  status: number;
}

export type AddNewSkillRequest = {
  name: string;
  description: string;
};

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

export async function addNewSkill(
  newSkill: AddNewSkillRequest
): Promise<ISkill> {
  try {
    const addNewSkillResponse = await post<ISkill>("/skilllevels", newSkill);

    console.log(addNewSkillResponse);

    return addNewSkillResponse.data;
  } catch (error) {
    console.error("Error adding new skill: ", error);
    throw error;
  }
}
