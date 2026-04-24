import { createResource, For, Show } from "solid-js"
import { useAuth, type AuthUser } from "@/context/auth"

type Member = {
  id: string
  name?: string
  avatar_url?: string
  bio?: string
}

async function fetchMembers(): Promise<Member[]> {
  try {
    const res = await fetch("/auth/users")
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default function MembersPage() {
  const auth = useAuth()
  const [members] = createResource(fetchMembers)

  return (
    <div class="h-dvh w-screen flex flex-col bg-background-base">
      <div class="border-b border-border-weaker-base px-6 py-4">
        <h1 class="text-18-medium text-text-strong">Members</h1>
        <p class="text-13-regular text-text-weak mt-1">Everyone in the community</p>
      </div>

      <div class="flex-1 overflow-auto p-6">
        <Show
          when={!members.loading}
          fallback={
            <div class="flex items-center justify-center py-12">
              <div class="animate-pulse text-text-weak text-sm">Loading members...</div>
            </div>
          }
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <For each={members()}>
              {(member) => (
                <a
                  href={`/profile/${member.id}`}
                  class="group flex items-start gap-3 rounded-xl border border-border-weaker-base bg-surface-panel p-4 transition-colors hover:border-border-weak-base"
                >
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-strong text-14-medium text-text-strong">
                    {(member.name ?? "U")[0].toUpperCase()}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-14-medium text-text-strong truncate">
                      {member.name ?? "Unknown"}
                    </div>
                    <Show when={member.bio}>
                      <div class="text-12-regular text-text-weak mt-1 line-clamp-2">
                        {member.bio}
                      </div>
                    </Show>
                    <Show when={member.id === auth.user()?.id}>
                      <span class="text-11-regular text-text-weaker mt-1 inline-block rounded bg-surface-strong px-1.5 py-0.5">
                        You
                      </span>
                    </Show>
                  </div>
                </a>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  )
}
