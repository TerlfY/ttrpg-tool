"use server";

import { updateUser } from "@/prisma/services/userService";

/**
 * This function is set to update user data related to privacy and safety preferences
 * @param id id of user to be updated
 * @param data data to be updated (currently only share_timezone)
 * @returns void on success, {error: string} on error
 */

export default async function changeUserPrivacyPrefs(
  id: string,
  data: {
    dm_permission?: string;
    //block_suspicious_links?: boolean;
    //show_link_embeds: boolean;
    share_timezone?: boolean;
  },
) {
  if (!data) {
    throw new Error("No data to be updated");
  }

  try {
    const updatedUser = await updateUser(id, data);
  } catch {
    throw new Error("Something went wrong. Please try again.");
  }
}
