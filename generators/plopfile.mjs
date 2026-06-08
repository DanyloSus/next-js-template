/**
 * Plop generators. Run with `npm run generate`.
 *
 * - `component`: scaffolds a UI component + story under src/components/ui.
 * - `feature`: scaffolds a feature folder (api/components/types) under src/features.
 *
 * Edit the .hbs templates in this folder to match your conventions.
 */
export default function plopConfig(plop) {
  plop.setGenerator("component", {
    description: "Create a reusable UI component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/ui/{{kebabCase name}}.tsx",
        templateFile: "templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/components/ui/{{kebabCase name}}.stories.tsx",
        templateFile: "templates/component.stories.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("feature", {
    description: "Create a feature folder",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name (kebab-case):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/features/{{kebabCase name}}/api/.gitkeep",
        template: "",
      },
      {
        type: "add",
        path: "../src/features/{{kebabCase name}}/components/.gitkeep",
        template: "",
      },
      {
        type: "add",
        path: "../src/features/{{kebabCase name}}/types/index.ts",
        template: "// Types for the {{kebabCase name}} feature\nexport {};\n",
      },
    ],
  });
}
