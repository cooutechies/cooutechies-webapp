/**
 * Domain Serializers Barrel Export
 */

export {
  serializeSpeaker,
  serializeEvent,
  serializeEvents,
} from "./eventSerializer";

export {
  serializeCommunityRegistration,
  serializeCommunityRegistrations,
  serializeEventRegistration,
  serializeEventRegistrations,
} from "./registrationSerializer";

export {
  serializeCoreTeamMember,
  serializeCoreTeamMembers,
} from "./coreTeamSerializer";

export {
  serializeEmailLog,
  serializeEmailLogs,
  serializeActivityLog,
  serializeActivityLogs,
} from "./emailSerializer";
