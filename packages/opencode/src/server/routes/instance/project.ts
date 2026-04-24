import { Hono } from "hono"
import { describeRoute, validator } from "hono-openapi"
import { resolver } from "hono-openapi"
import { Instance } from "@/project/instance"
import { Project } from "@/project"
import z from "zod"
import { ProjectID } from "@/project/schema"
import { errors } from "../../error"
import { lazy } from "@/util/lazy"
import { InstanceBootstrap } from "@/project/bootstrap"
import { AppRuntime } from "@/effect/app-runtime"
import { jsonRequest, runRequest } from "./trace"
import { Database } from "@/storage"
import { ProjectTable } from "@/project/project.sql"
import { eq, and } from "drizzle-orm"
import * as AuthUser from "@/auth/user/user"
import type { AuthUser as AuthUserType } from "@/auth/user/user"

declare module "hono" {
  interface ContextVariableMap {
    authUser?: AuthUserType
  }
}

function getAuthUser(c: { get: (key: string) => unknown }): AuthUserType | undefined {
  return c.get("authUser") as AuthUserType | undefined
}

export const ProjectRoutes = lazy(() =>
  new Hono()
    .get(
      "/",
      describeRoute({
        summary: "List all projects",
        description: "Get a list of projects that have been opened with OpenCode.",
        operationId: "project.list",
        responses: {
          200: {
            description: "List of projects",
            content: {
              "application/json": {
                schema: resolver(Project.Info.zod.array()),
              },
            },
          },
        },
      }),
      async (c) => {
        const authUser = getAuthUser(c)
        console.log("[project.list] authUser:", authUser?.id, authUser?.name, authUser?.email)
        if (authUser) {
          const rows = Database.use((db) =>
            db.select().from(ProjectTable).where(eq(ProjectTable.user_id, authUser.id)).all(),
          )
          console.log("[project.list] filtered rows:", rows.length)
          return c.json(rows.map((row) => Project.fromRow(row)))
        }
        console.log("[project.list] no authUser, returning all projects via Project.list()")
        const projects = Project.list()
        return c.json(projects)
      },
    )
    .get(
      "/current",
      describeRoute({
        summary: "Get current project",
        description: "Retrieve the currently active project that OpenCode is working with.",
        operationId: "project.current",
        responses: {
          200: {
            description: "Current project information",
            content: {
              "application/json": {
                schema: resolver(Project.Info.zod),
              },
            },
          },
        },
      }),
      async (c) => {
        return c.json(Instance.project)
      },
    )
    .post(
      "/",
      describeRoute({
        summary: "Create project",
        description:
          "Create a new project with an auto-generated directory, git repo, and session. Returns the project and session info.",
        operationId: "project.create",
        responses: {
          200: {
            description: "Created project and session",
            content: {
              "application/json": {
                schema: resolver(
                  z.object({
                    project: Project.Info.zod,
                    directory: z.string(),
                  }),
                ),
              },
            },
          },
          ...errors(400),
        },
      }),
      validator(
        "json",
        z
          .object({
            name: z.string().optional(),
          })
          .optional()
          .default({}),
      ),
      async (c) => {
        const body = c.req.valid("json")
        const authUser = getAuthUser(c)
        const userID = authUser?.id
        console.log("🟢 [ProjectRoutes.create] body:", body, "userID:", userID)
        try {
          const result = await runRequest(
            "ProjectRoutes.create",
            c,
            Project.Service.use((svc) => svc.create(body, userID)),
          )
          console.log("🟢 [ProjectRoutes.create] result:", result)
          return c.json(result)
        } catch (err) {
          console.error("🔴 [ProjectRoutes.create] FAILED:", err)
          throw err
        }
      },
    )
    .delete(
      "/:projectID",
      describeRoute({
        summary: "Delete project",
        description:
          "Delete a project and all associated data (sessions, messages, project folder). This is irreversible.",
        operationId: "project.delete",
        responses: {
          200: {
            description: "Successfully deleted project",
            content: {
              "application/json": {
                schema: resolver(z.boolean()),
              },
            },
          },
          ...errors(400, 404),
        },
      }),
      validator("param", z.object({ projectID: ProjectID.zod })),
      async (c) => {
        const projectID = c.req.valid("param").projectID
        const authUser = getAuthUser(c)
        if (authUser) {
          const row = Database.use((db) =>
            db.select().from(ProjectTable).where(eq(ProjectTable.id, projectID)).get(),
          )
          if (!row) return c.json({ error: "Not found" }, 404)
          if (row.user_id && row.user_id !== authUser.id) return c.json({ error: "Forbidden" }, 403)
        }
        await runRequest("ProjectRoutes.delete", c, Project.Service.use((svc) => svc.remove(projectID)))
        return c.json(true)
      },
    )
    .post(
      "/git/init",
      describeRoute({
        summary: "Initialize git repository",
        description: "Create a git repository for the current project and return the refreshed project info.",
        operationId: "project.initGit",
        responses: {
          200: {
            description: "Project information after git initialization",
            content: {
              "application/json": {
                schema: resolver(Project.Info.zod),
              },
            },
          },
        },
      }),
      async (c) => {
        const dir = Instance.directory
        const prev = Instance.project
        const next = await runRequest(
          "ProjectRoutes.initGit",
          c,
          Project.Service.use((svc) => svc.initGit({ directory: dir, project: prev })),
        )
        if (next.id === prev.id && next.vcs === prev.vcs && next.worktree === prev.worktree) return c.json(next)
        await Instance.reload({
          directory: dir,
          worktree: dir,
          project: next,
          init: () => AppRuntime.runPromise(InstanceBootstrap),
        })
        return c.json(next)
      },
    )
    .patch(
      "/:projectID",
      describeRoute({
        summary: "Update project",
        description: "Update project properties such as name, icon, and commands.",
        operationId: "project.update",
        responses: {
          200: {
            description: "Updated project information",
            content: {
              "application/json": {
                schema: resolver(Project.Info.zod),
              },
            },
          },
          ...errors(400, 404),
        },
      }),
      validator("param", z.object({ projectID: ProjectID.zod })),
      validator("json", Project.UpdateInput.omit({ projectID: true })),
      async (c) =>
        jsonRequest("ProjectRoutes.update", c, function* () {
          const projectID = c.req.valid("param").projectID
          const body = c.req.valid("json")
          const svc = yield* Project.Service
          return yield* svc.update({ ...body, projectID })
        }),
    ),
)
