/**
 * Core Team Server Actions
 * Thin transport layer: handles authentication, validation, and delegates to coreTeamService.
 */

"use server";

import type { ApiResponse } from "@/types/data.types";
import { type CoreTeamFormData, coreTeamFormSchema } from "@/lib/core-team-schema";
import type { CoreTeamMember } from "@/types/core-team.types";
import { requireAuth } from "@/lib/auth-helper";
import {
  createCoreTeamMemberService,
  getCoreTeamMembersService,
  getCoreTeamMemberByIdService,
  updateCoreTeamMemberService,
  deleteCoreTeamMemberService,
} from "@/lib/services/coreTeamService";

/**
 * Create a new core team member
 */
export async function createCoreTeamMember(
  formData: CoreTeamFormData
): Promise<ApiResponse<{ memberId: string }>> {
  const authError = await requireAuth<{ memberId: string }>();
  if (authError) return authError;

  try {
    const validatedData = coreTeamFormSchema.parse(formData);
    const { memberId } = await createCoreTeamMemberService(validatedData);

    return {
      success: true,
      message: "Core team member created successfully",
      data: { memberId },
    };
  } catch (error) {
    console.error("[CoreTeam:createCoreTeamMember] Action failed:", error);
    return {
      success: false,
      message: "Failed to create core team member",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get all core team members (Public endpoint)
 */
export async function getCoreTeamMembers(): Promise<
  ApiResponse<{
    members: CoreTeamMember[];
    total: number;
  }>
> {
  try {
    const members = await getCoreTeamMembersService();

    return {
      success: true,
      message: "Successfully Fetched CoreTeam Members",
      data: {
        members,
        total: members.length,
      },
    };
  } catch (error) {
    console.error("[CoreTeam:getCoreTeamMembers] Action failed:", error);
    return {
      success: false,
      message: "Failed to fetch core team members",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get a single core team member by ID
 */
export async function getCoreTeamMemberById(
  memberId: string
): Promise<ApiResponse<CoreTeamMember>> {
  try {
    const member = await getCoreTeamMemberByIdService(memberId);

    if (!member) {
      return {
        success: false,
        message: "Core team member not found",
        error: "MEMBER_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: "Core team member fetched successfully",
      data: member,
    };
  } catch (error) {
    console.error("[CoreTeam:getCoreTeamMemberById] Action failed:", error);
    return {
      success: false,
      message: "Failed to fetch core team member",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Update an existing core team member
 */
export async function updateCoreTeamMember(
  memberId: string,
  formData: Partial<CoreTeamFormData>
): Promise<ApiResponse<CoreTeamMember>> {
  const authError = await requireAuth<CoreTeamMember>();
  if (authError) return authError;

  try {
    const validatedData = coreTeamFormSchema.partial().parse(formData);
    const updatedMember = await updateCoreTeamMemberService(memberId, validatedData);

    if (!updatedMember) {
      return {
        success: false,
        message: "Core team member not found",
        error: "MEMBER_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: "Core team member updated successfully",
      data: updatedMember,
    };
  } catch (error) {
    console.error("[CoreTeam:updateCoreTeamMember] Action failed:", error);
    return {
      success: false,
      message: "Failed to update core team member",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete a core team member
 */
export async function deleteCoreTeamMember(
  memberId: string
): Promise<ApiResponse<never>> {
  const authError = await requireAuth<never>();
  if (authError) return authError;

  try {
    const { deleted } = await deleteCoreTeamMemberService(memberId);

    if (!deleted) {
      return {
        success: false,
        message: "Core team member not found",
        error: "MEMBER_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: "Core team member deleted successfully",
    };
  } catch (error) {
    console.error("[CoreTeam:deleteCoreTeamMember] Action failed:", error);
    return {
      success: false,
      message: "Failed to delete core team member",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
