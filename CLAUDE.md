# Augury: how to work in this project

The user wants **Muse** (a separate coding agent CLI) to do the heavy work: planning critiques, implementation, writing and fidelity reviews. You (Claude) are the **lead and reviewer**. The user has plenty of Muse tokens and few Claude tokens, so keep your own reading and writing lean.

The plan is `docs/PLAN.md`, with research in `docs/SOURCES.md`. They already exist, so build on them rather than starting over. A sister project built the same way is `~/yijing`, live at https://jakecp.github.io/yijing/. Copy its patterns where they fit: CI, the service worker, the icon build, the font subsetting.

## Running Muse

Always run it headless, in the background, with these flags:

```bash
cd ~/augury && muse exec --approval-mode never --user-input-auto-resolve \
  --prompt-file <scratchpad>/task.md > <scratchpad>/task.log 2>&1
```

Run it with Bash `run_in_background: true`. You'll be notified when it exits. Don't poll it or sleep while waiting.

**Flags and model:**
- **Model:** the default is `muse-wonder-full-1.0` at xhigh effort, set in `~/.config/muse/settings.json`. Don't pass `--model`.
- **`--approval-mode never` is required. The user authorised it.** Without it, Muse blocks forever on an approval prompt nobody can answer; once that cost 2 hours.
  - It keeps Muse's sandbox on and refuses escalations instead of waiting.
  - Don't use `--yolo` or `--disable-approval`. The user didn't authorise them, and Claude Code's safety check blocks them.

**Prompts and results:**
- Put the prompt in a file and use `--prompt-file`. Write prompts as a short brief: context, the exact task, constraints, what not to touch, and "do not commit".
- End every prompt by asking for "a brief summary". Muse's final message is the last part of the log, so read it with `sed -n '3,80p' task.log`. Don't read whole diffs.

**What Muse's sandbox cannot do.** Tell it so in every prompt:
- **Network installs:** it can't run `pip` or `npm` from the network. If it needs a tool, install it yourself into a repo-local folder, e.g. `python3 -m venv scripts/.cache/fontenv && scripts/.cache/fontenv/bin/pip install fonttools brotli`, and tell Muse the path.
- **Writing outside the repo:** "Write downloads and temp files inside the repo (e.g. scripts/.cache/, gitignored), never /tmp."
- **Servers and browsers:** it can't bind a localhost port or launch Chrome, so it **cannot take screenshots**. You do all the visual checking.
- **Committing:** say "Do not commit"; you commit after review.

**If a run seems stuck:**
- Sessions are logged in `~/.local/share/muse/sessions/YYYY/MM/DD/<id>/session.jsonl`.
- `grep -c human_pending` on that file shows whether it's waiting on an approval.
- Its last-modified time shows whether it's still active.
- Stop a run with `pkill -f "<unique prompt filename>"`. Don't put that pattern inside a Monitor command, or the pkill will kill the Monitor too.

**Running Muse in parallel:** two Muse runs are fine at once if they touch different files, e.g. one on the UI and one writing texts. Name the off-limits paths in each prompt.

## The workflow that worked

1. **Plan.** `docs/PLAN.md` already exists. Tighten it if needed.
2. **Muse reviews the plan.** It writes `docs/PLAN_REVIEW.md` as a prioritised list: Must fix, Should consider, Nitpicks. It's very thorough and has caught real errors.
3. **Decide.** You write `docs/DECISIONS.md`: accept or reject each item in one line. Then Muse folds the decisions into PLAN.md and builds phase 1.
4. **For each phase:** Muse implements it. Then you review:
   - Run the tests, e.g. `node --test` (without a `tests/` path argument).
   - Read Muse's summary.
   - Take screenshots and look at them.

   Then either commit, or write a short numbered fix list (MUST and SHOULD) to a prompt file and send it back.
5. **Content and translations.** Muse writes a pilot of 4–6 items plus a style guide first. Show the user a comparison page if it's a matter of taste. Muse then writes the rest in batches. Finally, run a **separate, independent Muse pass** as the reviewer. On the Yijing project that pass found 79 and then 133 real errors. Spot-check its changes; sometimes it overcorrects.
6. **Publishing.** Commit after each reviewed phase. Ask the user before pushing or publishing anything.

## Visual review (your job)

```bash
cd ~/augury && python3 -m http.server 8765 &   # once
node scripts/dev-screenshot.mjs /path/out.png "http://localhost:8765/#/" 375 812 0
node scripts/dev-screenshot.mjs /path/out.png "http://localhost:8765/#/" 1440 900 1 "(async()=>{ /* click things */ return document.title })()"
```

- **Arguments:** output file, URL, width, height, dark mode (0 or 1), and optional JavaScript to run before the capture. If the script returns a value, it's printed. It uses real mobile emulation; plain `--window-size` can't go below about 500px on macOS.
- **What to shoot:** check 375px (phone) and 1440px (desktop), plus dark mode once. Look at the key states only, to save tokens.
- **Known artefacts:** full-page captures cut off `position: fixed` backgrounds at the viewport height. That's a capture artefact, not a bug.
- **Sharing screenshots with Muse:** copy them into `scripts/.cache/review/` and tell it to look there.
- **Device APIs:** for things like the compass, test with `Emulation.setDeviceOrientationOverride` through CDP, or check the manual fallback. Remind the user to test on a real phone.

## Gotchas from the Yijing build

- **Creating GitHub repos:** `gh repo create` and the REST API returned HTTP 500 for every new repo on this account. The user created the repo at github.com/new, then you push and enable Pages: `gh api -X POST repos/JakeCP/<repo>/pages -f "source[branch]=main" -f "source[path]=/"`.
- **Paths:** GitHub Pages project sites live under `/<repo>/`, so every path must be relative. Fill in absolute `og:` and canonical URLs once the repo name is known.
- **Hash routes:** if you hand-type a test URL, make sure it's valid. An invalid one just shows the not-found page.
- **Who wrote the code:** Muse writes good code. Your value is taste, correctness checks and seeing the result. Don't rewrite its work yourself unless the fix is under about 5 lines.
- **Talking to the user:** give short progress notes. The user likes to see the site locally (`open http://localhost:8765/`) before anything is published.
