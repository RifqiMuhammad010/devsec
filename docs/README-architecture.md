# Architecture diagram (PlantUML)

Files:

- `docs/architecture.puml` — PlantUML source for system architecture (component, class, sequence).
Files:

- `docs/architecture-component.puml` — component diagram (frontend, libraries, blockchain, infra)
- `docs/architecture-class.puml` — class diagram for `KoiCert` / `KoiData` struct
- `docs/architecture-sequence.puml` — sequence diagram for minting flow
- `docs/architecture.puml` — (legacy combined file; may be removed)

Render options:

- VS Code: install the "PlantUML" extension and open `docs/architecture.puml` to preview and export.
- VS Code: install the "PlantUML" extension and open any of the `docs/architecture-*.puml` files to preview and export.
- CLI: use the `plantuml` jar. Example:

```bash
# render to PNG
plantuml docs/architecture.puml

# render to SVG
plantuml -tsvg docs/architecture.puml
```

Notes:

- The diagram shows high-level relationships between the Next.js frontend (`app/`), the `WalletProvider` (`context/WalletContext.tsx`), the Supabase client (`lib/supabase.ts`), the `contractConfig` (`lib/contractConfig.ts`), the Solidity contract (`contracts/KoiCert.sol`), and development tools (`scripts/deploy.ts`, Hardhat).
- Adjust `contractConfig` details (address/ABI) to match your deployed contract.
