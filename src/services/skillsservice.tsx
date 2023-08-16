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

export type AddNewSkillRequestType = {
  name: string;
  description: string;
};

export async function getAllSkills(): Promise<SkillsArray> {
  try {
    const skillsResponse = await get<SkillsArray>("/skilllevels");
    return skillsResponse;
  } catch (error) {
    console.error("Error fetching skills: ", error);
    throw error;
  }
}

export async function addNewSkill<T>(
  newSkill: AddNewSkillRequestType
): Promise<ApiResponse<T>> {
  try {
    const addNewSkillResponse: ApiResponse<T> = await post(
      "/skilllevels",
      newSkill
    );

    return addNewSkillResponse;
  } catch (error) {
    console.error("Error adding new skill: ", error);
    throw error;
  }
}
