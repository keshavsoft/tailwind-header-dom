/*
JSON CRUD UI CLI – Entry Flow

1. Read user input from terminal (parseInput)
2. If no command → show usage
3. If help flags → show usage
4. Resolve command dynamically
5. If command not found → show usage
6. Validate command requirements
7. Execute command

Goal:
- Zero confusion for user
- Single source of truth (showUsage)
- Self-validating commands
- Easy to extend (drop-in command architecture)
*/

export default function showUsage(version) {
    const g = "\x1b[32m";
    const y = "\x1b[33m";
    const c = "\x1b[36m";
    const gray = "\x1b[90m";
    const r = "\x1b[0m";

    console.log(`
${c}🚀 tailwind-header-dom v${version}${r}

${y}Usage:${r}
  ${g}npx tailwind-header-dom ${r} <command>

${y}Commands:${r}
  ${g}Header${r}      Builds header structure
  

${y}Examples:${r}
  ${gray}npx tailwind-header-dom header${r}

${y}Architecture:${r}
  ${gray}commands are auto-loaded dynamically${r}
  ${gray}each command validates required files${r}

${y}Tip:${r}
  ${gray}Run init first before feature commands${r}
`);
}