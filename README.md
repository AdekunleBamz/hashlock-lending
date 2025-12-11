# HashLock Lending

Yield on Bitcoin. Locked by code. Verified by hash.

## Overview
HashLock Lending is a trustless BTCFi lending protocol on Stacks (Bitcoin L2). It uses Clarity 4 features like `contract-hash?` and `restrict-assets?` to ensure every vault matches an exact audited code hash, eliminating rugs and admin risks.

## Features
- Template-verified vaults: Funds only enter if vault bytecode matches whitelisted hash.
- Post-condition asset restrictions: Auto-revert on unauthorized transfers.
- Immutable core: No upgrades, pure code-is-law.

## Setup & Development
1. Install Clarinet: `cargo install clarinet`
2. Clone repo: `git clone https://github.com/yourusername/hashlock-lending.git`
3. Run tests: `clarinet test`
4. Deploy to testnet: `clarinet deploy --testnet`

## Contracts
- `hashlock-core.clar`: Main lending pool and template registry.
- `safe-vault-base.clar`: Base logic for safe external calls.
- `isolated-flash-vault.clar`: Example whitelisted vault template.

## Roadmap
- Q1 2026: Mainnet launch with 2 templates.
- Add governance for new templates.

Built with Clarity 4 on Stacks. 🚀
