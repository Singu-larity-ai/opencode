import { createEffect, createMemo, For, Show, type Accessor, type JSX } from "solid-js"
import { IconButton } from "@opencode-ai/ui/icon-button"
import { Tooltip, TooltipKeybind } from "@opencode-ai/ui/tooltip"
import { DropdownMenu } from "@opencode-ai/ui/dropdown-menu"
import { useAuth } from "@/context/auth"
import { usePlatform } from "@/context/platform"

export const SidebarContent = (props: {
  mobile?: boolean
  opened: Accessor<boolean>
  aimMove: (event: MouseEvent) => void
  activeNav: Accessor<string>
  onNavSelect: (id: string) => void
  settingsLabel: Accessor<string>
  settingsKeybind: Accessor<string | undefined>
  onOpenSettings: () => void
  helpLabel: Accessor<string>
  onOpenHelp: () => void
  renderPanel: () => JSX.Element
}): JSX.Element => {
  const platform = usePlatform()
  const auth = platform.platform === "web" ? useAuth() : null
  const expanded = createMemo(() => !!props.mobile || props.opened())
  const placement = () => (props.mobile ? "bottom" : "right")
  let panel: HTMLDivElement | undefined

  createEffect(() => {
    const el = panel
    if (!el) return
    if (expanded()) {
      el.removeAttribute("inert")
      return
    }
    el.setAttribute("inert", "")
  })

  const navItems = [
    { id: "conversations", icon: "bubble-5" as const, label: "Conversations" },
  ] as const

  return (
    <div class="flex h-full w-full min-w-0 overflow-hidden">
      <div
        data-component="sidebar-rail"
        class="w-16 shrink-0 bg-background-base flex flex-col items-center overflow-hidden"
        onMouseMove={props.aimMove}
      >
        <div class="flex-1 min-h-0 w-full">
          <div class="h-full w-full flex flex-col items-center gap-3 px-3 py-3">
            <For each={navItems}>
              {(item) => (
                <Tooltip placement={placement()} value={item.label}>
                  <IconButton
                    icon={item.icon}
                    variant={props.activeNav() === item.id ? "secondary" : "ghost"}
                    size="large"
                    onClick={() => props.onNavSelect(item.id)}
                    aria-label={item.label}
                  />
                </Tooltip>
              )}
            </For>
          </div>
        </div>
        <div class="shrink-0 w-full pt-3 pb-6 flex flex-col items-center gap-2">
          <Show when={auth?.isAuthenticated() && auth?.user()}>
            <DropdownMenu>
              <DropdownMenu.Trigger
                type="button"
                class="w-8 h-8 rounded-full bg-icon-interactive-base text-[#FFF] flex items-center justify-center text-12-medium font-semibold overflow-hidden cursor-pointer outline-none ring-2 ring-transparent data-[expanded]:ring-icon-interactive-base transition-shadow"
                aria-label="User menu"
              >
                <Show when={auth!.user()!.avatar_url} fallback={<span>{(auth!.user()!.name || auth!.user()!.email || "?")[0]?.toUpperCase()}</span>}>
                  <img src={auth!.user()!.avatar_url!} alt="" class="w-full h-full object-cover" />
                </Show>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content class="min-w-48 mb-2">
                  <div class="px-2 py-1.5 text-sm text-text-base font-medium truncate">
                    {auth!.user()!.name || auth!.user()!.email || "User"}
                  </div>
                  <Show when={auth!.user()!.email && auth!.user()!.name}>
                    <div class="px-2 pb-1.5 text-xs text-text-weak truncate">
                      {auth!.user()!.email}
                    </div>
                  </Show>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onSelect={() => window.location.href = "/members"}>
                    <DropdownMenu.ItemLabel>Members</DropdownMenu.ItemLabel>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => auth!.logout()}>
                    <DropdownMenu.ItemLabel>Sign out</DropdownMenu.ItemLabel>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu>
          </Show>
          <TooltipKeybind placement={placement()} title={props.settingsLabel()} keybind={props.settingsKeybind() ?? ""}>
            <IconButton
              icon="settings-gear"
              variant="ghost"
              size="large"
              onClick={props.onOpenSettings}
              aria-label={props.settingsLabel()}
            />
          </TooltipKeybind>
        </div>
      </div>

      <div
        ref={(el) => {
          panel = el
        }}
        classList={{ "flex-1 flex h-full min-h-0 min-w-0 overflow-hidden": true, "pointer-events-none": !expanded() }}
        aria-hidden={!expanded()}
      >
        {props.renderPanel()}
      </div>
    </div>
  )
}
