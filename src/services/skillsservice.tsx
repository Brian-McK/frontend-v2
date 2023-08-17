import { IApiResponse, del, get, post } from "./api";

export interface ISkill {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface ISkillsArray extends Array<ISkill> {}

export type AddNewSkillRequestType = {
  name: string;
  description: string;
};

export async function getAllSkills<T>(): Promise<IApiResponse<T>> {
  try {
    const skillsResponse: IApiResponse<T> = await get("/skilllevels");
    return skillsResponse;
  } catch (error) {
    console.error("Error fetching skills: ", error);
    throw error;
  }
}

export async function addNewSkill<T>(
  newSkill: AddNewSkillRequestType
): Promise<IApiResponse<T>> {
  try {
    const addNewSkillResponse: IApiResponse<T> = await post(
      "/skilllevels",
      newSkill
    );

    return addNewSkillResponse;
  } catch (error) {
    console.error("Error adding new skill: ", error);
    throw error;
  }
}

export async function deleteSkill<T>(
  skillToDelete: string
): Promise<IApiResponse<T>> {
  try {
    const deleteSkillResponse: IApiResponse<T> = await del(
      "/skilllevels",
      skillToDelete
    );

    return deleteSkillResponse;
  } catch (error) {
    console.error("Error adding new skill: ", error);
    throw error;
  }
}
