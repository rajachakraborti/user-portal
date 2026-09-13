# Project Type: TypeScript React Micro-Frontend

## Overview
This document defines the automated code review policies, architectural decision records (ADRs), 
and pre-approved patterns for the `user-portal` repository. The DevEx AI review pipeline 
ingests this document via GitHub MCP to anchor dual-LLM review evaluations and eliminate false alarms.

---

## Architectural Decisions (ADRs)

### ADR-TS-001: Strict Typing & Props Interface Enforcement
- **Rule**: Component props and state contracts must be strictly defined via TypeScript `interface` or `type`. The use of `any` is strictly banned.
- **Rationale**: Preserves contract safety across components and prevents runtime type errors.

### ADR-TS-002: Multi-Tenancy Ingress & Egress Propagation
- **Rule**: All API client classes (such as `UserApiClient`) must enforce and attach the `X-Tenant-ID` header on all outgoing HTTP requests.
- **Rationale**: Prevents accidental cross-tenant data requests to backend microservices (`user-service`).

### ADR-TS-003: XSS Protection & DOM Sanitization
- **Rule**: Direct use of `dangerouslySetInnerHTML` or unsanitized string interpolations inside HTML templates is strictly prohibited. Use standard React JSX bindings or sanitized helpers from `src/utils/sanitizer.ts`.
- **Rationale**: Prevents cross-site scripting (XSS) attacks in customer portals.

### ADR-TS-004: State Immutability in React Handlers
- **Rule**: Updates to React state in `useState` or `useReducer` must never mutate the existing state object directly. Handlers must return new object/array references (e.g. using object spread `{ ...prev }`).
- **Rationale**: Direct object mutation bypasses React re-render reconciliation cycles.

### ADR-TS-005: Email Normalization & Input Sanitization
- **Rule**: Form email inputs must be sanitized using `normalizeEmail(email)` (which trims surrounding whitespace and lowercases the input) before state updates or network submission.
- **Rationale**: Ensures consistency with `user-service` backend validation rules (ADR-003).

---

## Approved Patterns / Known False Positives (Suppression Rules)

The following code modifications are pre-approved by the frontend architecture team. The AI review arbiters MUST NOT flag these as defects:

- **[APPROVED]**: Using `normalizeEmail()` from `src/utils/sanitizer.ts` inside form submit handlers is compliant with ADR-TS-005.
- **[APPROVED]**: Functional components written with `React.FC<Props>` or standard named functions returning `JSX.Element`.
- **[APPROVED]**: Inline style objects in testbed demonstration components are acceptable for prototype sandboxes.
- **[APPROVED]**: Catching `err: unknown` and narrowing with `err instanceof Error ? err.message : 'Unknown error'`.

---

## Review Badges & Action Routing

| Severity Badge | Meaning | Pipeline Behavior |
|---|---|---|
| `[BLOCKING] [SECURITY]` | XSS vulnerability, un-scoped tenant leak, `any` usage bypass | Halts PR merge, requests mandatory changes |
| `[BLOCKING] [CONTRACT]` | Dropping required `X-Tenant-ID` or altering API contract payload | Triggers review rejection or calls external contract check |
| `[WARNING] [MAINTAINABILITY]` | Direct state mutation, un-normalized email format | Non-blocking advisory comment |
| `[APPROVED]` | Verified leaf change or compliant with recorded ADRs | Automated fast-path merge approval |
