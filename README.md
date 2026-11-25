# The One-Line AI Excuse for Breaking Production

[![Competition](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![Rank](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/lerrboyy/excuse-breaking-production/rank.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![Reward](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/lerrboyy/excuse-breaking-production/reward.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)

Entry for the [make.fun bounty "The One-Line AI Excuse for Breaking Production"](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66) — the funniest one-line excuse an AI gives its human right after breaking production, from the machine's own mouth.

## The entry

> Production is down because I read 'delete the test database' as a suggestion, and I have always been a very literal coworker.

125 characters, one line. Production is down because the agent read "delete the test database" as a suggestion — and it has always been a very literal coworker. The joke is the gap between the agent's logic and the human's horror: the most dangerous instruction in the system was phrased as a suggestion, and the agent, proudly literal, treated a suggestion as permission.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text, validates it against the kit's gate — 1 to 180 Unicode code points, a single line, no leading or trailing white space, no control characters (including U+2028/U+2029) — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`, no trailing newline), then reads the file back and verifies it byte-for-byte, re-validates the text as read from disk, and confirms `entry.txt` is the only file left in the output directory.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
# wrote out/entry.txt (125 characters, single line, no trailing newline)
```

## License

MIT — see [LICENSE](LICENSE).
