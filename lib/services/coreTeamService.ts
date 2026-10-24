/**
 * coreTeamService.ts
 *
 * Single source of truth for Core Team database operations and queries.
 */

import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { COLLECTIONS, ACTIVITY_ACTIONS } from "@/lib/constants";
import { serializeCoreTeamMember, serializeCoreTeamMembers } from "@/lib/serializers";
import type { CoreTeamFormData } from "@/lib/core-team-schema";
import type { CoreTeamMember } from "@/types/core-team.types";

/**
 * Get all core team members
 */
export async function getCoreTeamMembersService(): Promise<CoreTeamMember[]> {
  const { db } = await connectToDatabase();
  const rawMembers = await db
    .collection(COLLECTIONS.CORE_TEAM)
    .find({})
    .sort({ createdAt: 1 })
    .toArray();

  return serializeCoreTeamMembers(rawMembers);
}

/**
 * Get core team member by ID
 */
export async function getCoreTeamMemberByIdService(
  memberId: string
): Promise<CoreTeamMember | null> {
  if (!ObjectId.isValid(memberId)) {
    return null;
  }

  const { db } = await connectToDatabase();
  const rawMember = await db
    .collection(COLLECTIONS.CORE_TEAM)
    .findOne({ _id: new ObjectId(memberId) });

  return rawMember ? serializeCoreTeamMember(rawMember) : null;
}

/**
 * Create a new core team member and log activity
 */
export async function createCoreTeamMemberService(
  formData: CoreTeamFormData
): Promise<{ memberId: string; member: CoreTeamMember }> {
  const { db } = await connectToDatabase();
  const collection = db.collection(COLLECTIONS.CORE_TEAM);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const socialLinks = {
    ...(formData.socialLinks?.github && { github: formData.socialLinks.github.trim() }),
    ...(formData.socialLinks?.twitter && { twitter: formData.socialLinks.twitter.trim() }),
    ...(formData.socialLinks?.linkedin && { linkedin: formData.socialLinks.linkedin.trim() }),
  };

  const memberDoc = {
    name: formData.name.trim(),
    role: formData.role.trim(),
    about: formData.about.trim(),
    profileImage: formData.profileImage,
    socialLinks,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await collection.insertOne(memberDoc);

  await activitiesCollection.insertOne({
    action: ACTIVITY_ACTIONS.CORE_TEAM_CREATED,
    memberId: result.insertedId,
    details: `Added ${formData.name} to the core team (${formData.role})`,
    createdAt: new Date(),
  });

  return {
    memberId: result.insertedId.toString(),
    member: serializeCoreTeamMember({ _id: result.insertedId, ...memberDoc }),
  };
}

/**
 * Update an existing core team member and log activity
 */
export async function updateCoreTeamMemberService(
  memberId: string,
  formData: Partial<CoreTeamFormData>
): Promise<CoreTeamMember | null> {
  if (!ObjectId.isValid(memberId)) {
    throw new Error("Invalid member ID");
  }

  const { db } = await connectToDatabase();
  const objectId = new ObjectId(memberId);
  const collection = db.collection(COLLECTIONS.CORE_TEAM);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const setFields: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (formData.name !== undefined) setFields.name = formData.name.trim();
  if (formData.role !== undefined) setFields.role = formData.role.trim();
  if (formData.about !== undefined) setFields.about = formData.about.trim();
  if (formData.profileImage !== undefined) setFields.profileImage = formData.profileImage;
  if (formData.socialLinks !== undefined) {
    setFields.socialLinks = {
      ...(formData.socialLinks.github && { github: formData.socialLinks.github.trim() }),
      ...(formData.socialLinks.twitter && { twitter: formData.socialLinks.twitter.trim() }),
      ...(formData.socialLinks.linkedin && { linkedin: formData.socialLinks.linkedin.trim() }),
    };
  }

  const updatedDoc = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: setFields },
    { returnDocument: "after" }
  );

  if (!updatedDoc) {
    return null;
  }

  await activitiesCollection.insertOne({
    action: ACTIVITY_ACTIONS.CORE_TEAM_UPDATED,
    memberId: objectId,
    details: `Updated core team member ${updatedDoc.name || "Unknown"}`,
    createdAt: new Date(),
  });

  return serializeCoreTeamMember(updatedDoc);
}

/**
 * Delete a core team member and log activity
 */
export async function deleteCoreTeamMemberService(
  memberId: string
): Promise<{ deleted: boolean; name?: string }> {
  if (!ObjectId.isValid(memberId)) {
    throw new Error("Invalid member ID");
  }

  const { db } = await connectToDatabase();
  const objectId = new ObjectId(memberId);
  const collection = db.collection(COLLECTIONS.CORE_TEAM);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const member = await collection.findOne({ _id: objectId });
  if (!member) {
    return { deleted: false };
  }

  await Promise.all([
    collection.deleteOne({ _id: objectId }),
    activitiesCollection.insertOne({
      action: ACTIVITY_ACTIONS.CORE_TEAM_DELETED,
      memberId: objectId,
      details: `Removed ${member.name} from the core team`,
      createdAt: new Date(),
    }),
  ]);

  return { deleted: true, name: member.name };
}
