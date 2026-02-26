# Contributing to HashLock Lending

Thank you for your interest in contributing to HashLock Lending!

## Project Overview

HashLock Lending is the world's first lending protocol that cryptographically guarantees every vault is an exact, audited, immutable template using Clarity 4's contract-hash? and restrict-assets? functions.

## Getting Started

1. Clone the repository
2. Install Clarinet for local development
3. Create a feature branch

## Development Setup

```bash
# Install Clarinet
curl -sL https://github.com/hirosystems/clarinet/releases/download/v1.7.1/clarinet-macos-arm64.tar.gz | tar -xz
sudo mv clarinet /usr/local/bin/

# Verify installation
clarinet --version

# Run tests
clarinet test

# Check contract syntax
clarinet check
```

## Smart Contract Guidelines

- Always add comprehensive documentation to new functions
- Use meaningful variable and function names
- Add inline comments for complex logic
- Include proper error handling with descriptive error codes
- Test all public functions thoroughly

## Pull Request Process

1. Ensure all tests pass
2. Update documentation for any changes
3. Use clear, descriptive commit messages
4. Reference any related issues

## Security Considerations

- Never introduce admin keys to immutable contracts
- Always verify vault template hashes
- Use post-conditions for asset transfers
- Test edge cases thoroughly

## Questions?

Open an issue for questions about contributing.
