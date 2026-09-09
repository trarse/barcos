import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // El cliente de Prisma se regenera en cada `prisma generate`: no es
    // código nuestro y no tiene sentido analizarlo.
    "src/generated/**",
    // Artefactos del despliegue de Netlify: código empaquetado, no nuestro.
    ".netlify/**",
  ]),
]);

export default eslintConfig;
