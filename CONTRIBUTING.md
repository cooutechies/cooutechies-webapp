# COOU Techies — Contributor Guide

> This guide applies to **all contributors**: human developers and AI coding assistants (LLMs) alike.  
> Every rule here exists to protect code quality, maintainability, and visual consistency.  
> **Separation of Concerns (SoC) is strictly enforced in this codebase.** Don't deviate without explicit team alignment — and document whenever you do.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [File Size Limit (< 450 Lines)](#3-file-size-limit--450-lines)
4. [Separation of Concerns (SoC) Architecture](#4-separation-of-concerns-soc-architecture)
5. [Current SoC Violations & Refactoring Blueprint](#5-current-soc-violations--refactoring-blueprint)
6. [DRY — Don't Repeat Yourself](#6-dry--dont-repeat-yourself)
7. [Domain-Driven Organization](#7-domain-driven-organization)
8. [TypeScript & Serialization Boundary Rules](#8-typescript--serialization-boundary-rules)
9. [Server Actions & API Route Patterns](#9-server-actions--api-route-patterns)
10. [Service Layer (`lib/services/`)](#10-service-layer-libservices)
11. [Database & MongoDB Native Driver Patterns](#11-database--mongodb-native-driver-patterns)
12. [Serializers (`lib/serializers/`)](#12-serializers-libserializers)
13. [Zod Schemas & Validation](#13-zod-schemas--validation)
14. [React Query & Client State Management](#14-react-query--client-state-management)
15. [Loading, Error & Empty Fallbacks](#15-loading-error--empty-fallbacks)
16. [Component Guidelines & Design System](#16-component-guidelines--design-system)
17. [Rich Text & TipTap Architecture](#17-rich-text--tiptap-architecture)
18. [Email Pipeline (Resend & React Email)](#18-email-pipeline-resend--react-email)
19. [Authentication Architecture (NextAuth v5)](#19-authentication-architecture-nextauth-v5)
20. [Security & Privacy Rules](#20-security--privacy-rules)
21. [Environment Variables](#21-environment-variables)
22. [Automated Testing & Invariant Rules](#22-automated-testing--invariant-rules)
23. [Git & Commit Rules](#23-git--commit-rules)

---

## 1. Project Overview

**COOU Techies WebApp** is the official digital platform for the **Chukwuemeka Odumegwu Ojukwu University Tech Community**. It powers campus events, community membership registration, leadership showcases, rich-text email broadcasts, automated reminders, and administrative operations.

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript (Strict Mode)
- **Database**: MongoDB via official native driver (`mongodb` v7) with connection pooling singleton
- **Authentication**: NextAuth v5 (beta.30) with JWT session strategy & MongoDB credential validation
- **State & Data Fetching**: TanStack React Query v5 (client cache) + Server Actions (mutations/data fetching)
- **Validation**: Zod (v3/v4) with `@hookform/resolvers`
- **Styling**: Tailwind CSS v4 (`@theme`, OKLCH design tokens, Orbitron display font & Inter sans font)
- **UI Primitives**: Radix UI + Framer Motion + Lucide React
- **Rich Text Authoring**: TipTap v3 (`@tiptap/react`, `@tiptap/pm`, starter kit)
- **Communications**: Resend + React Email (`@react-email/components`, `@react-email/render`)
- **Media Storage**: Cloudinary + AWS S3 SDK for posters, photos, and assets
- **Feedback**: Sonner (`toast`)

---

## 2. Folder Structure

```
cooutechies-webapp/
├── app/                           # Next.js App Router (pages, actions, routes)
│   ├── (auth)/                    # Public auth pages (login, create-account)
│   ├── actions/                   # Thin transport server actions (delegate to lib/services/)
│   │   ├── auth.ts
│   │   ├── core-team.ts
│   │   ├── dashboard.ts
│   │   ├── emails.ts
│   │   ├── events.ts
│   │   └── registrations.ts
│   ├── admin/                     # Admin dashboard protected pages
│   │   ├── automation/            # Email triggers & automated tasks
│   │   ├── core-team/             # Core team management
│   │   ├── emails/                # Email broadcast builder & logs
│   │   ├── events/                # Event creation, editing, & attendee tracking
│   │   ├── registrations/         # Community registrations & exports
│   │   ├── settings/              # Admin account & platform settings
│   │   ├── layout.tsx             # Admin shell with sidebar & header
│   │   └── page.tsx               # Admin analytics overview
│   ├── api/                       # HTTP API routes (webhooks, file uploads)
│   │   ├── auth/                  # NextAuth route handler ([...nextauth])
│   │   └── upload/                # Cloudinary / S3 upload & delete endpoints
│   ├── biography/                 # Public community core team showcase
│   ├── events/                    # Public events listing & event detail page
│   ├── register/                  # Public community registration page
│   ├── globals.css                # Tailwind CSS v4 @theme tokens & OKLCH variables
│   ├── layout.tsx                 # Root layout (fonts, providers, Sonner toast)
│   └── page.tsx                   # Community landing page
│
├── components/                    # React UI components
│   ├── admin/                     # Admin-scoped components
│   │   ├── admin-event-page/      # Event form, attendee tables, detail widgets
│   │   ├── core-team/             # Core team table & modals
│   │   ├── email-builder/         # TipTap broadcast builder & live preview
│   │   ├── home/                  # Dashboard charts & stat cards
│   │   ├── registrations/         # Registrations data table & filters
│   │   └── shared/                # Admin-scoped skeletons, error states, headers
│   ├── auth/                      # Login & admin creation forms
│   ├── email-templates/           # React Email templates (announcements, reminders)
│   ├── eventPage/                 # Public event cards, details, & registration modal
│   ├── layout/                    # Public Navbar, Footer, MobileNav
│   ├── providers/                 # Theme, QueryClient, & Session providers
│   ├── sections/                  # Landing page sections (Hero, About, Vision, CTA)
│   ├── shared/                    # Reusable cross-feature UI (PageSkeleton, EmptyState, FetchError)
│   ├── tiptap-ui/                 # TipTap toolbar and editor components
│   └── ui/                        # Radix/shadcn UI primitives ONLY (Button, Dialog, Input)
│
├── hooks/                         # Domain-driven React Query & UI hooks
│   ├── admin/                     # Admin metrics & log queries
│   ├── core-team/                 # Core team queries & mutations
│   ├── events/                    # Event listings, details, & mutations
│   ├── registrations/             # Registration queries & mutations
│   └── (root)                     # Generic UI hooks (useIsBreakpoint, useDebounce)
│
├── lib/                           # Core utilities, services, & server modules
│   ├── services/                  # SERVER-ONLY: Pure DB queries & business logic
│   │   ├── eventService.ts        # Events DB queries, aggregations, attendee counts
│   │   ├── registrationService.ts # Registration flow, capacity checks, confirmations
│   │   ├── emailService.ts        # Resend dispatch, batching, template rendering, logging
│   │   ├── coreTeamService.ts     # Core team CRUD, sorting, role assignments
│   │   └── dashboardService.ts    # Admin analytics, metrics, activity feed
│   ├── serializers/               # Domain serializers: BSON (ObjectId/Date) → Client JSON
│   │   ├── eventSerializer.ts
│   │   ├── registrationSerializer.ts
│   │   ├── coreTeamSerializer.ts
│   │   ├── emailSerializer.ts
│   │   └── index.ts               # Barrel export for all serializers
│   ├── validations/               # Zod validation schemas & inferred types
│   │   ├── event.schema.ts
│   │   ├── registration.schema.ts
│   │   ├── core-team.schema.ts
│   │   ├── auth.schema.ts
│   │   └── index.ts
│   ├── constants.ts               # App-wide constants (COLLECTIONS, ROLES, LIMITS)
│   ├── db.ts                      # MongoDB connection pool singleton
│   ├── crypto.ts                  # Password hashing & verification
│   ├── format.ts                  # Date, time, & count formatters
│   ├── uploadFile.ts              # Cloudinary / S3 upload helper
│   └── utils.ts                   # cn() helper and class merging
│
├── types/                         # Domain TypeScript declarations
│   ├── auth.types.ts              # Session, JWT, user roles
│   ├── event.types.ts             # Raw DB event document & speaker types
│   ├── registration.types.ts      # Community & event registration documents
│   ├── core-team.types.ts         # Core team member documents
│   ├── email.types.ts             # Email logs, templates, recipient types
│   ├── serialized.types.ts        # Client-safe JSON DTO interfaces
│   └── data.types.ts              # Generic ApiResponse<T>, pagination types
│
├── public/                        # Static assets (logos, fallback images)
├── styles/                        # SCSS animation & variable helpers
├── auth.ts                        # NextAuth v5 configuration & credentials provider
└── proxy.ts                       # Edge middleware: route guards & admin protection
```

### Strict Folder Placement Rules

1. **Never place business logic or DB calls inside `components/ui/`**. Those are purely presentational primitives.
2. **Never import server-only code** (`lib/db`, `lib/services/*`, `mongodb`) inside Client Components (`"use client"`).
3. **API routes (`app/api/`) and Server Actions (`app/actions/`) are strictly transport layers.** They must delegate database operations and email dispatch to `lib/services/`.
4. **All shared types belong in `types/`**, organized by domain. Never define duplicate inline interfaces across components.
5. **Reusable components belong in `components/shared/`**. Domain-specific components belong in their domain folder (`components/admin/`, `components/eventPage/`).

---

## 3. File Size Limit (< 450 Lines)

> [!IMPORTANT]
> **Hard Limit: 450 lines per file.**  
> Any file reaching or exceeding 450 lines must be decomposed before submitting a pull request.

Large files violate Single Responsibility, create merge conflicts, and obscure review diffs.

### How to Refactor Files Exceeding 450 Lines

| Target File Type | Refactoring Recipe |
|---|---|
| **Large Forms** (e.g. `event-form.tsx`) | 1. Extract sub-sections into child components (`EventBasicInfoSection.tsx`, `EventSpeakerSection.tsx`, `EventMediaSection.tsx`).<br>2. Extract custom form logic into a domain hook (`useEventForm.ts`).<br>3. Move Zod schema to `lib/validations/`. |
| **Email Templates** (e.g. `ConfirmationEmail.tsx`, `EventConfirmationEmail.tsx`) | 1. Extract shared email layout/wrapper (`EmailLayout.tsx`).<br>2. Extract header, QR/ticket badge, event details, and footer into modular email sub-components.<br>3. Extract inline styling maps to a shared email theme file (`styles/email-theme.ts`). |
| **Client Pages** (e.g. `EventsContent.tsx`, `EventDetailClient.tsx`) | 1. Extract search/filter bars to `EventFilters.tsx`.<br>2. Extract event grid and list view to `EventListGrid.tsx`.<br>3. Extract attendee modal to `EventRegistrationModal.tsx`. |
| **Server Actions / Services** (e.g. `emails.ts`) | 1. Extract pure DB queries to `lib/services/emailService.ts`.<br>2. Extract Resend client and dispatch loop to `lib/email/dispatcher.ts`.<br>3. Keep the server action under 100 lines as a thin orchestrator. |
| **Navigation / Layouts** (e.g. `sidebar.tsx`) | 1. Extract navigation items configuration to `constants/navigation.ts`.<br>2. Extract user profile widget to `SidebarUserProfile.tsx`.<br>3. Extract mobile drawer sheet to `MobileSidebar.tsx`. |

---

## 4. Separation of Concerns (SoC) Architecture

Each layer in the COOU Techies architecture has **one and only one job**.

```
┌────────────────────────────────────────────────────────┐
│                      UI LAYER                          │
│   Pages (`app/**/page.tsx`) & Components (`components/`)│
│   Responsibility: Render UI, user interaction, states  │
└───────────────────────────┬────────────────────────────┘
                            │ Calls React Query hook
┌───────────────────────────▼────────────────────────────┐
│                     HOOKS LAYER                        │
│   `hooks/{domain}/use*.ts` (React Query / Client Cache)│
│   Responsibility: Data caching, invalidation, mutations│
└───────────────────────────┬────────────────────────────┘
                            │ Calls Server Action or API
┌───────────────────────────▼────────────────────────────┐
│             TRANSPORT / ORCHESTRATION LAYER            │
│   Server Actions (`app/actions/`) & API (`app/api/`)   │
│   Step 1: Auth & Role check (requireAuth())            │
│   Step 2: Zod Input Validation (safeParse())           │
│   Step 3: Call Service Layer                           │
│   Step 4: Serialize Response (lib/serializers/)        │
│   Step 5: Return typed ApiResponse<T>                  │
└───────────────────────────┬────────────────────────────┘
                            │ Delegates execution
┌───────────────────────────▼────────────────────────────┐
│                    SERVICE LAYER                       │
│   `lib/services/*Service.ts` (Server-Only Pure Logic)  │
│   Responsibility: DB queries, aggregations, Resend     │
│   email dispatch, Cloudinary cleanup, activity logging │
└───────────────────────────┬────────────────────────────┘
                            │ Reads & writes
┌───────────────────────────▼────────────────────────────┐
│               DATABASE & SERIALIZER LAYER              │
│   `lib/db.ts` (MongoDB Connection Pool)                │
│   `lib/serializers/*Serializer.ts` (BSON → Plain JSON) │
└────────────────────────────────────────────────────────┘
```

### Responsibility Matrix

| Layer | Responsibility | Allowed Dependencies | Prohibited Actions |
|---|---|---|---|
| **Page** (`app/**/page.tsx`) | Layout shell, page metadata, SSR orchestration | Components, Services (SSR only) | Directly writing raw MongoDB queries in client pages; heavy inline forms |
| **Component** (`components/**`) | Render presentation, fire user events, show fallbacks | Hooks, UI primitives, serializers | Direct DB calls; calling Resend/Cloudinary directly; inline schemas |
| **Hook** (`hooks/**`) | React Query caching, query keys, mutation lifecycle | Server Actions, API clients | Direct DB imports; bypassing Server Action/API transport |
| **Server Action** (`app/actions/**`) | Transport validation, auth gating, calling services, returning `ApiResponse<T>` | Services, Zod Schemas, `requireAuth` | Direct `db.collection` queries; inline Resend dispatch; manual object transformation loops |
| **API Route** (`app/api/**`) | Webhooks, external payloads, file upload streams | Services, Zod Schemas | Complex inline business logic; DB queries without service encapsulation |
| **Service** (`lib/services/**`) | Business logic, complex MongoDB aggregation pipelines, Resend emails, audit logs | `lib/db.ts`, Resend, Cloudinary, Serializers | Importing React components; handling HTTP `NextResponse` or `Request` |
| **Serializer** (`lib/serializers/**`) | Clean BSON (`ObjectId`, `Date`) to client JSON | Domain types | Database operations; modifying DB documents |
| **Schema** (`lib/validations/**`) | Input sanitization, validation, type inference | Zod | Side effects; database connections |

---

## 5. Current SoC Violations & Refactoring Blueprint

### Identified Codebase Violations

1. **Monolithic Server Actions Doing Everything**:
   - `app/actions/emails.ts` (609 lines) connects to MongoDB, performs multi-collection queries, checks auth, dynamically imports React Email components, renders HTML strings, calls Resend, records email logs, and writes to activity logs all in one file.
   - `app/actions/events.ts` (408 lines) connects directly to MongoDB, performs queries, loops through events running individual `countDocuments` queries (causing N+1 performance bottlenecks), and serializes objects inline.
2. **Missing Service Layer (`lib/services/`)**:
   - There is no single source of truth for database operations. If an event query is needed in both an admin server action and a public server page, code is duplicated.
3. **Missing Dedicated Serializer Layer (`lib/serializers/`)**:
   - Serialization from MongoDB BSON to JSON is performed with ad-hoc `.map()` statements in action handlers instead of centralized serializers.
4. **File Size Violations (> 450 lines)**:
   - `components/admin/admin-event-page/event-form.tsx` (911 lines)
   - `components/email-templates/ConfirmationEmail.tsx` (829 lines)
   - `components/email-templates/EventConfirmationEmail.tsx` (707 lines)
   - `components/sections/Register.tsx` (625 lines)
   - `lib/tiptap-utils.ts` (612 lines)
   - `app/actions/emails.ts` (609 lines)
   - `components/eventPage/EventsContent.tsx` (606 lines)
   - `components/admin/core-team/core-team-form.tsx` (540 lines)
   - `components/admin/sidebar.tsx` (518 lines)
   - `components/admin/admin-event-page/EventDetailClient.tsx` (517 lines)
5. **Security & Logging Leak**:
   - `auth.ts` contained `console.log("[Auth Debug] Stored hash:", user.password)` which logs password hashes to terminal logs.

### The Refactoring Blueprint

When touching any feature area, contributors must refactor towards this 3-step pipeline:

```ts
// 1. EXTRACT DB LOGIC TO SERVICE (lib/services/eventService.ts)
export async function getEventsWithCounts({ page = 1, limit = 10 }) {
  const { db } = await connectToDatabase();
  // Optimized aggregation pipeline — NO N+1 loops!
  const results = await db.collection(COLLECTIONS.EVENTS).aggregate([...]).toArray();
  return serializeEvents(results);
}

// 2. SLIM DOWN SERVER ACTION (app/actions/events.ts)
export async function getEventsAction(page = 1, limit = 10): Promise<ApiResponse<PaginatedEvents>> {
  try {
    const data = await getEventsWithCounts({ page, limit });
    return { success: true, message: "Events fetched successfully", data };
  } catch (error) {
    console.error("[Events:getEventsAction]", error);
    return { success: false, message: "Failed to fetch events", error: "Internal server error" };
  }
}

// 3. CONSUME VIA REACT QUERY HOOK (hooks/events/useEvents.ts)
export function useEvents(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["events", { page, limit }],
    queryFn: () => getEventsAction(page, limit).then(res => {
      if (!res.success) throw new Error(res.message);
      return res.data;
    }),
  });
}
```

---

## 6. DRY — Don't Repeat Yourself

### Centralized Constants

Never hardcode magic strings or collection names. Use `lib/constants.ts`:

```ts
// ❌ BAD — repeatedly reading process.env inline
const EVENTS_COLLECTION = process.env.EVENTS_COLLECTION!;
const db = client.db().collection(EVENTS_COLLECTION);

// ✅ GOOD — centralized constants
import { COLLECTIONS } from "@/lib/constants";
const collection = db.collection<EventDocument>(COLLECTIONS.EVENTS);
```

### Shared Payload Types

Derive payload types from base schemas or interfaces. Never write duplicate interfaces:

```ts
// lib/validations/event.schema.ts
export const eventFormSchema = z.object({ ... });
export type EventFormValues = z.infer<typeof eventFormSchema>;

// types/event.types.ts
export type CreateEventInput = Omit<EventDocument, "_id" | "createdAt" | "updatedAt">;
```

---

## 7. Domain-Driven Organization

Group code by **domain** (`events`, `registrations`, `core-team`, `emails`, `admin`), never by pure technical separation.

### React Query Hooks
Colocate queries and mutations for the same domain in the same file:

```
hooks/
├── events/
│   ├── useEvents.ts             # Contains useEvents query & useCreateEvent mutation
│   └── useEventDetail.ts        # Contains useEventDetail query & update mutations
├── registrations/
│   └── useRegistrations.ts      # Registration queries, exports, and filters
├── core-team/
│   └── useCoreTeam.ts           # Core team listing & member mutations
└── admin/
    └── useDashboardStats.ts     # Admin overview metrics & activity logs
```

---

## 8. TypeScript & Serialization Boundary Rules

### Strict Mode & No `any`
- `any` is strictly banned. Use `unknown` with type narrowing.
- Suppressing TypeScript with `// @ts-ignore` or `as any` will result in PR rejection.

### The Serialization Boundary (BSON vs JSON)
MongoDB documents contain native BSON types: `ObjectId` and `Date`.  
Next.js Client Components **cannot** receive BSON instances across the Server/Client boundary.

```ts
// ❌ BAD — Passing MongoDB BSON directly to client
const event = await db.collection("events").findOne({ _id: new ObjectId(id) });
return { success: true, data: event }; // 💥 Serialization Error in Client Component

// ✅ GOOD — Cleanly serialized through domain serializer
import { serializeEvent } from "@/lib/serializers";
const event = await db.collection("events").findOne({ _id: new ObjectId(id) });
return { success: true, data: serializeEvent(event) };
```

### Null vs Undefined
- In database records and serialized JSON DTOs, **prefer `null` over `undefined`**.
- `JSON.stringify` silently strips `undefined` keys, leading to hydration mismatches. Use `?? null`:

```ts
announcementSentAt: doc.announcementSentAt ? doc.announcementSentAt.toISOString() : null,
bio: doc.bio ?? null,
```

---

## 9. Server Actions & API Route Patterns

Every Server Action in `app/actions/` must follow this 5-step pipeline:

```ts
"use server";

import { requireAuth } from "@/lib/auth-helper";
import { eventFormSchema } from "@/lib/validations";
import { createEventService } from "@/lib/services/eventService";
import type { ApiResponse } from "@/types/data.types";
import type { SerializedEvent } from "@/types/serialized.types";

export async function createEventAction(
  rawInput: unknown
): Promise<ApiResponse<SerializedEvent>> {
  try {
    // 1. Auth & Authorization Gate
    const authError = await requireAuth();
    if (authError) return authError;

    // 2. Input Validation via Zod
    const validation = eventFormSchema.safeParse(rawInput);
    if (!validation.success) {
      return {
        success: false,
        message: "Invalid event data",
        error: validation.error.issues[0]?.message || "Validation failed",
      };
    }

    // 3. Delegate to Service Layer
    const createdEvent = await createEventService(validation.data);

    // 4. Return Standard Typed Response
    return {
      success: true,
      message: "Event created successfully",
      data: createdEvent,
    };
  } catch (error) {
    // 5. Prefix error logs with domain and action
    console.error("[Events:createEventAction]", error);
    return {
      success: false,
      message: "Failed to create event",
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
}
```

### Standard Response Type
Every server action must return `ApiResponse<T>`:

```ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
```

---

## 10. Service Layer (`lib/services/`)

Services in `lib/services/` are **server-only** singletons containing domain business logic.

### Rules
1. Call `await connectToDatabase()` inside the service method.
2. Return serialized plain objects or typed domain models.
3. Encapsulate multi-collection actions (e.g., updating an event and creating an activity log) inside the service.
4. **Never** import client components, React hooks, or HTTP request/response objects into a service.

```ts
/**
 * lib/services/eventService.ts
 * Single source of truth for all event data operations.
 */
import { connectToDatabase } from "@/lib/db";
import { COLLECTIONS } from "@/lib/constants";
import { serializeEvent, serializeEvents } from "@/lib/serializers";
import type { EventFormValues } from "@/lib/validations";
import type { SerializedEvent } from "@/types/serialized.types";

export async function createEventService(
  data: EventFormValues
): Promise<SerializedEvent> {
  const { db } = await connectToDatabase();
  
  const eventDocument = {
    title: data.title,
    description: data.description,
    date: new Date(data.date),
    location: data.location,
    coverImage: data.coverImage,
    duration: data.duration,
    speakers: data.speakers || [],
    maxAttendees: data.maxAttendees ?? null,
    announcementSent: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(COLLECTIONS.EVENTS).insertOne(eventDocument);
  
  // Record activity log
  await db.collection(COLLECTIONS.ACTIVITIES).insertOne({
    action: "event_created",
    eventId: result.insertedId,
    details: `Event "${data.title}" created`,
    createdAt: new Date(),
  });

  return serializeEvent({ _id: result.insertedId, ...eventDocument });
}
```

---

## 11. Database & MongoDB Native Driver Patterns

### Connection Pool Singleton
Use `connectToDatabase()` from `lib/db.ts`. Do not instantiate new `MongoClient` instances manually.

### Avoid N+1 Queries (Aggregation Pipelines)
Never execute queries inside an array `.map()` loop. Use MongoDB aggregation pipelines:

```ts
// ❌ BAD — N+1 query: 1 query for events + N queries for counts
const events = await db.collection("events").find({}).toArray();
const results = await Promise.all(
  events.map(async (event) => {
    const count = await db.collection("registrations").countDocuments({ eventId: event._id });
    return { ...event, count };
  })
);

// ✅ GOOD — Single aggregation pipeline with $lookup or $facet
const results = await db.collection(COLLECTIONS.EVENTS).aggregate([
  { $sort: { date: -1 } },
  { $skip: skip },
  { $limit: limit },
  {
    $lookup: {
      from: COLLECTIONS.EVENT_REGISTRATIONS,
      localField: "_id",
      foreignField: "eventId",
      as: "registrations",
    },
  },
  {
    $project: {
      title: 1,
      date: 1,
      location: 1,
      coverImage: 1,
      registrationCount: { $size: "$registrations" },
    },
  },
]).toArray();
```

### Projections
Always specify projection `{ projection: { password: 0 } }` to avoid pulling unnecessary or sensitive fields from the database.

---

## 12. Serializers (`lib/serializers/`)

All raw MongoDB documents must pass through a serializer before being passed across the boundary to client components or API responses.

```ts
/**
 * lib/serializers/eventSerializer.ts
 */
import type { WithId, Document } from "mongodb";
import type { SerializedEvent } from "@/types/serialized.types";

export function serializeEvent(doc: WithId<Document> | Record<string, any>): SerializedEvent {
  return {
    _id: doc._id?.toString() ?? "",
    title: doc.title,
    description: doc.description,
    date: doc.date instanceof Date ? doc.date.toISOString() : String(doc.date),
    location: doc.location,
    coverImage: doc.coverImage,
    duration: doc.duration ?? null,
    speakers: (doc.speakers || []).map((s: any) => ({
      name: s.name,
      role: s.role,
      bio: s.bio ?? "",
      photo: s.photo ?? null,
    })),
    maxAttendees: doc.maxAttendees ?? null,
    registrationCount: doc.registrationCount ?? 0,
    announcementSent: Boolean(doc.announcementSent),
    announcementSentAt: doc.announcementSentAt instanceof Date 
      ? doc.announcementSentAt.toISOString() 
      : null,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
    updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : String(doc.updatedAt),
  };
}

export function serializeEvents(docs: WithId<Document>[]): SerializedEvent[] {
  return docs.map(serializeEvent);
}
```

---

## 13. Zod Schemas & Validation

All validation schemas live in `lib/validations/`.

### Form Schemas vs API Schemas

| Type | Target | Rule |
|---|---|---|
| **Form Schema** | Used in `useForm` with `zodResolver` | **Never** use `.transform()`. It causes type mismatches and breaks React Hook Form input synchronization. |
| **Server Schema** | Used in Server Actions & API routes | Can use `.transform()`, `.trim()`, and `.toLowerCase()`. |

```ts
// lib/validations/registration.schema.ts

// Form Schema — strictly validates input types
export const registrationFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  department: z.string().min(2, "Department required"),
  level: z.string().min(1, "Select your level"),
  campus: z.string().min(1, "Select your campus"),
  reason: z.string().min(20, "Please provide at least 20 characters"),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
```

---

## 14. React Query & Client State Management

All client data fetching goes through React Query hooks in `hooks/`. Never call server actions or APIs directly in component `useEffect` blocks.

```ts
/**
 * hooks/events/useEvents.ts
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventsAction, createEventAction } from "@/app/actions/events";
import { toast } from "sonner";

export const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  list: (page: number, limit: number) => [...eventKeys.lists(), { page, limit }] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

export function useEvents(page = 1, limit = 10) {
  return useQuery({
    queryKey: eventKeys.list(page, limit),
    queryFn: async () => {
      const response = await getEventsAction(page, limit);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load events");
      }
      return response.data;
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEventAction,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      } else {
        toast.error(response.error || response.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred");
    },
  });
}
```

---

## 15. Loading, Error & Empty Fallbacks

> [!IMPORTANT]
> **Every data-driven UI must handle all three states: Loading, Error, and Empty.**  
> Never render a blank screen, an infinite spinner, or a raw unformatted error message.

```tsx
export function EventList() {
  const { data, isLoading, isError, refetch } = useEvents();

  // 1. Loading State: Skeleton layout
  if (isLoading) {
    return <AdminSkeleton variant="card-grid" count={6} />;
  }

  // 2. Error State: Clear error message with retry action
  if (isError) {
    return (
      <AdminErrorState
        title="Failed to load events"
        message="Unable to fetch events from the server. Please check your connection."
        onRetry={() => refetch()}
      />
    );
  }

  // 3. Empty State: Explanatory message with Call to Action
  if (!data?.events || data.events.length === 0) {
    return (
      <EmptyState
        title="No events scheduled"
        description="There are currently no active or past events in the community."
        action={{ label: "Create Event", href: "/admin/events/create" }}
      />
    );
  }

  // 4. Content State
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
```

---

## 16. Component Guidelines & Design System

### Design System & Theme Tokens

This project uses **Tailwind CSS v4** with CSS theme tokens defined in `app/globals.css`.

> [!WARNING]
> **Never hardcode hex colors or arbitrary values (e.g. `text-[#12ff43]`, `bg-green-600`) in components.**  
> Always use semantic theme classes.

| Token | Class | Semantic Purpose |
|---|---|---|
| Primary | `bg-primary`, `text-primary` | Main brand color (Green accent), primary buttons |
| Primary Foreground | `text-primary-foreground` | Text on primary buttons |
| Secondary | `bg-secondary`, `text-secondary` | Secondary brand color (Gold/Amber accent) |
| Background | `bg-background` | Global page background (Light / Dark) |
| Surface / Card | `bg-card`, `text-card-foreground` | Cards, popovers, modal surfaces |
| Muted | `text-muted-foreground`, `bg-muted` | Subtitles, secondary copy, inactive tabs |
| Border | `border-border` | Component borders, table dividers |
| Destructive | `bg-destructive`, `text-destructive` | Danger actions, delete buttons |

### Typography
- **Headings & Badges**: Use `font-display` ("Orbitron") for community brand impact.
- **Body & Forms**: Use `font-sans` ("Inter") for readable copy.

### Icons
- **Always** use `lucide-react` icons.
- **Never** use raw emoji characters as icons in UI buttons, headings, or navigation tabs.

---

## 17. Rich Text & TipTap Architecture

TipTap powers the admin email broadcast authoring and event descriptions.

### Guidelines
1. **Sanitize on Output**: Always sanitize TipTap HTML strings on the server before dispatching via Resend or rendering with `dangerouslySetInnerHTML`.
2. **Keep Extension Setup Modular**: Separate extensions, shortcuts, and custom bubble menus into `lib/tiptap/` submodules. Do not allow `lib/tiptap-utils.ts` to exceed 450 lines.
3. **Editor Component Boundaries**: The TipTap editor must only emit `onChange(html: string)` or `onChange(json: object)`. It must not handle API requests directly.

---

## 18. Email Pipeline (Resend & React Email)

All emails are dispatched through **Resend** using **React Email** components in `components/email-templates/`.

### Architecture Rules
1. **Centralized Dispatch**: All sending logic belongs in `lib/services/emailService.ts`.
2. **Audit Logging**: Every dispatched email must record an entry in `EMAIL_LOGS_COLLECTION` to guarantee an audit trail and prevent duplicate triggers.
3. **Template Decomposition**: Email templates like `ConfirmationEmail.tsx` must be broken down into modular components (< 450 lines per file).
4. **Development Fallback**: When `RESEND_API_KEY` is not configured in local development, log the email to `console.info` without crashing the application flow.

---

## 19. Authentication Architecture (NextAuth v5)

Authentication is configured in `auth.ts` using NextAuth v5 with a JWT session strategy for admin access.

### Route Protection Architecture

```
Incoming Request
      │
      ▼
┌───────────────┐
│   proxy.ts    │  ──(Edge Middleware)──> Is route /admin/*?
└───────┬───────┘                           │
        │                                   ├──> No session: Redirect to /login
        │                                   └──> Role !== "admin": Redirect to /login
        ▼
┌───────────────┐
│    auth.ts    │  ──(Session Validation)──> Verify JWT token & check isActive
└───────┬───────┘
        ▼
┌───────────────┐
│ requireAuth() │  ──(Server Action Gating)──> Protect server actions statelessly
└───────────────┘
```

### Critical Auth Rules
- **NEVER** log passwords or password hashes to the console (`console.log(user.password)` is strictly forbidden).
- Always verify the user is active (`user.isActive !== false`) during authorization.
- Every admin Server Action must call `await requireAuth()` at the very first line before running any database logic.

---

## 20. Security & Privacy Rules

1. **Server-Side Secrets**: Environment variables containing secrets (`MONGODB_URL`, `AUTH_SECRET`, `RESEND_API_KEY`, `CLOUDINARY_API_SECRET`) must **NEVER** have the `NEXT_PUBLIC_` prefix.
2. **Cloudinary / S3 Uploads**: Image uploads must be validated for file size (max 5MB) and MIME type (`image/png`, `image/jpeg`, `image/webp`) on the server route `/api/upload`.
3. **Stateless Edge Guarding**: Non-admin users must be intercepted at the edge via `proxy.ts` before database queries are triggered.
4. **Sanitize Search Inputs**: All MongoDB string searches must escape special regex characters to prevent ReDoS (Regular Expression Denial of Service) attacks.

---

## 21. Environment Variables

Maintain all configuration variables in `.env.example`.

| Variable | Description | Required? | Exposed to Client? |
|---|---|---|---|
| `MONGODB_URL` | MongoDB connection connection string | Yes | No |
| `MONGODB_DATABASE_NAME` | Database name (e.g. `cooutechies`) | Yes | No |
| `AUTH_SECRET` | NextAuth encryption secret | Yes | No |
| `ADMIN_TOKEN` | Secret seed token for bootstrapping admin accounts | Yes | No |
| `RESEND_API_KEY` | Resend API key for outbound emails | Yes | No |
| `RESEND_FROM_EMAIL` | Sender address (e.g. `team@cooutechies.org`) | Yes | No |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary storage account name | Yes | No |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | No |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | No |
| `NEXT_PUBLIC_APP_URL` | Base canonical application URL | Yes | **Yes** |
| `NEXT_PUBLIC_WHATSAPP_CHANNEL`| Community WhatsApp Channel link | No | **Yes** |
| `EVENTS_COLLECTION` | Events collection name | Optional (default: `events`) | No |
| `EVENT_REGISTRATIONS_COLLECTION` | Event attendees collection name | Optional (default: `event_registrations`) | No |
| `REGISTRATIONS_COLLECTION` | Community members collection name | Optional (default: `registrations`) | No |
| `EMAIL_LOGS_COLLECTION` | Sent emails audit collection name | Optional (default: `email_logs`) | No |
| `ACTIVITIES_COLLECTION` | Admin activity logs collection name | Optional (default: `activities`) | No |
| `CORE_TEAM_COLLECTION` | Core team members collection name | Optional (default: `core_team`) | No |
| `ADMIN_COLLECTION` | Admin users collection name | Optional (default: `admin`) | No |

---

## 22. Automated Testing & Invariant Rules

Automated tests protect our core community and data invariants.

### Key Business Invariants
1. **The Event Capacity Invariant**: If `maxAttendees` is set, registrations must reject new signups once confirmed attendees reach capacity.
2. **The Unique Registration Invariant**: A single email address cannot be registered more than once for the same `eventId`.
3. **The Email Deduplication Invariant**: Automated event reminders (e.g., 3-day reminder) must check `EMAIL_LOGS_COLLECTION` before sending to prevent spamming attendees.
4. **The Serialization Safety Invariant**: Data returned to client components must strictly match `SerializedEvent` or `SerializedRegistration` (zero `ObjectId` or raw `Date` objects).

---

## 23. Git & Commit Rules

### Branch Naming Convention

```
feat/event-capacity-limit
fix/tiptap-image-upload-bug
refactor/extract-event-service
docs/update-contributing-guide
chore/upgrade-nextjs
```

### Commit Format ([Conventional Commits](https://www.conventionalcommits.org/))

```
feat: add automated 24hr event reminder service
fix: prevent duplicate registration submissions on click
refactor: extract event queries into eventService.ts
style: apply oklch brand colors to admin sidebar
docs: document separation of concerns in CONTRIBUTING.md
```

### Pre-PR Checklist

> [!WARNING]
> **NEVER bypass git hooks with `--no-verify`.** If TypeScript or ESLint fails, fix the underlying issue before pushing.

- [ ] `pnpm run build` passes with **0 TypeScript and lint errors**.
- [ ] **Separation of Concerns verified**: No raw MongoDB queries inside UI components, pages, or server actions (all queries delegated to `lib/services/`).
- [ ] **File Size verified**: No file touched or created exceeds **450 lines**.
- [ ] All new MongoDB queries return serialized plain objects via `lib/serializers/`.
- [ ] All data-dependent UI components implement **Loading, Error, and Empty** fallbacks.
- [ ] No `console.log` left in production code paths (especially no password/token logging).
- [ ] All colors use Tailwind CSS v4 design tokens (`bg-primary`, `bg-card`, etc.) from `globals.css`.
- [ ] New environment variables are documented in `.env.example`.

---

*Maintained by the COOU Techies Core Team · Updated 2026*
