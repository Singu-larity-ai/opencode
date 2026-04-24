import { Button } from "@opencode-ai/ui/button"
import { useDialog } from "@opencode-ai/ui/context/dialog"
import { Dialog } from "@opencode-ai/ui/dialog"
import { TextField } from "@opencode-ai/ui/text-field"
import { createSignal } from "solid-js"
import { base64Encode } from "@opencode-ai/shared/util/encode"
import { useNavigate } from "@solidjs/router"
import { useGlobalSDK } from "@/context/global-sdk"
import { useGlobalSync } from "@/context/global-sync"
import { useLayout } from "@/context/layout"

export function DialogNewProject() {
  const dialog = useDialog()
  const navigate = useNavigate()
  const globalSDK = useGlobalSDK()
  const globalSync = useGlobalSync()
  const layout = useLayout()

  const [name, setName] = createSignal("")
  const [isCreating, setIsCreating] = createSignal(false)
  const [error, setError] = createSignal<string | undefined>()

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const trimmed = name().trim()
    if (!trimmed) return
    if (isCreating()) return

    setIsCreating(true)
    setError(undefined)

    try {
      const raw = await globalSDK.client.project.create({ name: trimmed })
      console.group("🔵 DIALOG_NEW_PROJECT")
      console.log("1. raw SDK response:", raw)
      console.log("2. raw.data:", raw?.data)
      console.log("3. raw.error:", raw?.error)
      console.groupEnd()
      const result = raw.data
      if (!result?.directory) {
        const detail = raw?.error ? JSON.stringify(raw.error) : "No directory in response"
        console.error("🔴 DIALOG_NEW_PROJECT FAILED:", detail)
        setError(`Failed to create project: ${detail}`)
        return
      }

      globalSync.child(result.directory)
      layout.projects.open(result.directory)
      dialog.close()
      navigate(`/${base64Encode(result.directory)}/session`)
    } catch (e: any) {
      setError(e?.message || String(e))
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog title="New Project" class="w-full max-w-[400px] mx-auto">
      <form onSubmit={handleSubmit} class="flex flex-col gap-5 p-6 pt-4">
        <TextField
          autofocus
          type="text"
          label="Project name"
          placeholder="My Project"
          value={name()}
          onChange={setName}
        />

        {error() && <div class="text-13-regular text-red-500">{error()}</div>}

        <div class="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="large" onClick={() => dialog.close()}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="large" disabled={isCreating() || !name().trim()}>
            {isCreating() ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
