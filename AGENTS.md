<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- NEMPO Feed is migrated from github.com/nempocreative/nempo-60 as a sub-app in `src/apps/feed`, mounted at `/nempo-feed` (`/` redirects there); why: the owner is migrating that repo section by section.
- tsconfig strict extras (noUncheckedIndexedAccess, exactOptionalPropertyTypes, etc.) are off to match the source repo; why: migrated code was written without them.
- GGS prebuilt download files (MP4/PNG asset pointers) are captured from the live preview with the slide root pinned at 0,0 and 1440 CSS px wide, CSS animations paused and stepped per frame; videos at dpr 1. A 2× still is allowed only by capturing at dpr 2 with the header/footer overlay hidden and compositing the overlay afterwards with a Lanczos 2× upscale; why: the overlays are 1440×1920 bitmaps and the browser's rescale blurs their text. Recapture when the slide changes.
