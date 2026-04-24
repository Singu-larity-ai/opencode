import { createMemo, For, Show, type Accessor } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { base64Encode } from "@opencode-ai/shared/util/encode"
import { Button } from "@opencode-ai/ui/button"
import { IconButton } from "@opencode-ai/ui/icon-button"
import { useGlobalSync } from "@/context/global-sync"
import { useLayout, type LocalProject } from "@/context/layout"
import { getFilename } from "@opencode-ai/shared/util/path"
import type { Session } from "@opencode-ai/sdk/v2/client"

const AVATAR_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
]

function avatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export const ConversationList = (props: {
  activeProject: Accessor<LocalProject | undefined>
  panelWidth: Accessor<number>
  mobile?: boolean
  onNewConversation: () => void
}) => {
  const navigate = useNavigate()
  const globalSync = useGlobalSync()
  const layout = useLayout()

  const projects = createMemo(() => layout.projects.list())

  const conversations = createMemo(() => {
    const list = projects() ?? []
    return list
      .map((project) => {
        const dir = project.worktree
        const syncData = globalSync.peek(dir, { bootstrap: false })
        const store = syncData?.[0]
        const sessions = store?.session ?? []
        const rootSession = sessions.find((s: Session) => !s.parentID)

        return {
          project,
          session: rootSession,
          name: project.name || getFilename(project.worktree),
          time: rootSession?.time?.updated || project.time?.updated || 0,
        }
      })
      .sort((a, b) => b.time - a.time)
  })

  function createConversation() {
    props.onNewConversation()
  }

  function navigateToConversation(project: LocalProject) {
    const dir = project.worktree
    layout.projects.open(dir)
    const slug = base64Encode(dir)
    const syncData = globalSync.peek(dir, { bootstrap: false })
    const store = syncData[0]
    const sessions = store.session || []
    const rootSession = sessions.find((s: Session) => !s.parentID)
    if (rootSession) {
      navigate(`/${slug}/session/${rootSession.id}`)
    } else {
      navigate(`/${slug}/session`)
    }
  }

  const panel = () => props.panelWidth()

  return (
    <div
      classList={{
        "flex flex-col min-h-0 min-w-0 box-border rounded-tl-[12px] px-3": true,
        "border-l border-t border-border-weaker-base": true,
        "bg-background-base": true,
        "flex-1 min-w-0 max-w-full overflow-hidden": props.mobile,
      }}
      style={{
        width: props.mobile ? undefined : `${panel() - 64}px`,
      }}
    >
      <div class="shrink-0 py-3 px-1">
        <div class="flex items-center justify-between">
          <div class="text-14-medium text-text-strong">Conversations</div>
          <IconButton icon="plus" variant="ghost" size="small" onClick={createConversation} aria-label="New conversation" />
        </div>
      </div>
      <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <For each={conversations()}>
          {(conv) => {
            const isActive = createMemo(
              () => props.activeProject()?.worktree === conv.project.worktree,
            )
            const initial = createMemo(() => (conv.name[0] || "?").toUpperCase())
            const color = createMemo(() => avatarColor(conv.name))

            return (
              <button
                type="button"
                classList={{
                  "w-full text-left flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors": true,
                  "bg-background-stronger": isActive(),
                  "hover:bg-background-stronger": !isActive(),
                }}
                onClick={() => navigateToConversation(conv.project)}
              >
                <div
                  classList={{
                    "w-8 h-8 rounded-full flex items-center justify-center text-12-medium font-semibold text-white shrink-0": true,
                    [color()]: true,
                  }}
                >
                  {initial()}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-13-medium text-text-strong truncate">{conv.name}</div>
                  <Show when={conv.session?.title}>
                    <div class="text-12-regular text-text-weak truncate">
                      {conv.session!.title}
                    </div>
                  </Show>
                </div>
              </button>
            )
          }}
        </For>
        <Show when={conversations().length === 0}>
          <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div class="text-14-regular text-text-base mb-4">No conversations yet</div>
            <Button size="large" icon="plus-small" onClick={createConversation}>
              New Conversation
            </Button>
          </div>
        </Show>
      </div>
    </div>
  )
}
