import { createResource, Show, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import { useAuth, type AuthUser } from "@/context/auth"
import { Button } from "@opencode-ai/ui/button"
import { TextField } from "@opencode-ai/ui/text-field"

type Profile = {
  id: string
  name?: string
  avatar_url?: string
  bio?: string
  time_created?: number
}

async function fetchProfile(userID: string): Promise<Profile | null> {
  try {
    const res = await fetch(`/auth/profile/${userID}`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default function ProfilePage() {
  const params = useParams()
  const auth = useAuth()
  const [profile] = createResource(() => params.userID, fetchProfile)
  const isOwnProfile = () => auth.user()?.id === params.userID

  return (
    <div class="h-dvh w-screen flex flex-col bg-background-base">
      <div class="border-b border-border-weaker-base px-6 py-4">
        <a href="/members" class="text-13-regular text-text-weak hover:text-text-base transition-colors">
          &larr; Members
        </a>
      </div>

      <div class="flex-1 overflow-auto p-6">
        <Show
          when={!profile.loading}
          fallback={
            <div class="flex items-center justify-center py-12">
              <div class="animate-pulse text-text-weak text-sm">Loading profile...</div>
            </div>
          }
        >
          <Show
            when={profile()}
            fallback={
              <div class="flex items-center justify-center py-12">
                <div class="text-text-weak text-sm">User not found</div>
              </div>
            }
          >
            {(p) => (
              <div class="mx-auto max-w-2xl">
                <div class="flex items-start gap-5">
                  <div class="flex size-16 shrink-0 items-center justify-center rounded-full bg-surface-strong text-24-medium text-text-strong">
                    {(p().name ?? "U")[0].toUpperCase()}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h1 class="text-20-medium text-text-strong">{p().name ?? "Unknown"}</h1>
                    <Show when={p().bio}>
                      <p class="text-14-regular text-text-base mt-2">{p().bio}</p>
                    </Show>
                    <Show when={p().time_created}>
                      <p class="text-12-regular text-text-weak mt-3">
                        Joined {new Date(p().time_created!).toLocaleDateString()}
                      </p>
                    </Show>
                    <Show when={isOwnProfile()}>
                      <EditBio currentBio={p().bio ?? ""} />
                    </Show>
                  </div>
                </div>
              </div>
            )}
          </Show>
        </Show>
      </div>
    </div>
  )
}

function EditBio(props: { currentBio: string }) {
  const [editing, setEditing] = createSignal(false)
  const [bio, setBio] = createSignal(props.currentBio)
  const [saving, setSaving] = createSignal(false)

  const save = async () => {
    setSaving(true)
    try {
      await fetch("/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio: bio() }),
      })
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Show
      when={editing()}
      fallback={
        <Button variant="ghost" size="small" class="mt-3" onClick={() => setEditing(true)}>
          Edit bio
        </Button>
      }
    >
      <div class="mt-3 flex flex-col gap-2">
        <TextField
          type="text"
          value={bio()}
          onChange={setBio}
          placeholder="Tell us about yourself..."
        />
        <div class="flex gap-2">
          <Button variant="primary" size="small" onClick={save} disabled={saving()}>
            {saving() ? "Saving..." : "Save"}
          </Button>
          <Button variant="ghost" size="small" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </Show>
  )
}
