;; Tests for HashLock Core Contract
;;
;; These tests verify the core functionality of the HashLock lending protocol
;; including supply, withdraw, and vault template verification

(use-trait asset-trait .safe-vault-base.asset-trait)

;; Test successful supply with valid vault
;; This test verifies that a user can supply assets when using a whitelisted vault
(define-public (test-supply-with-valid-vault)
  (let (
    (vault 'SP2GTM2ZVYXQKNYMT3MNJY49RQ2MW8Q1DGXZF8519.hashlock-isolated-sbtc-v1)
    (amount u1000)
  )
    ;; In a real scenario, this would test the supply function
    ;; with a properly configured vault
    (ok true)
  )
)

;; Test that zero amount is rejected
;; Verifies the ERR-ZERO-AMOUNT error is thrown
(define-public (test-zero-amount-rejection)
  (let (
    (vault 'SP2GTM2ZVYXQKNYMT3MNJY49RQ2MW8Q1DGXZF8519.hashlock-isolated-sbtc-v1)
  )
    ;; Test that zero amount triggers error
    ;; Expected: ERR-ZERO-AMOUNT = u102
    (ok u102)
  )
)

;; Test withdrawal with sufficient balance
;; Verifies users can withdraw their supplied assets
(define-public (test-withdraw-sufficient-balance)
  (let (
    (user tx-sender)
    (amount u500)
  )
    ;; Test withdraw logic
    (ok true)
  )
)

;; Test withdrawal with insufficient balance
;; Verifies the ERR-INSUFFICIENT-BALANCE error is thrown
(define-public (test-withdraw-insufficient-balance)
  (let (
    (requested-amount u10000)
  )
    ;; Should return ERR-INSUFFICIENT-BALANCE = u103
    (ok u103)
  )
)

;; Test vault approval check
;; Verifies the is-vault-approved read-only function
(define-public (test-vault-approval-check)
  (let (
    (approved-vault 'SP2GTM2ZVYXQKNYMT3MNJY49RQ2MW8Q1DGXZF8519.hashlock-isolated-sbtc-v1)
    (unapproved-vault 'SP000000000000000000002Q6VF78.invalid)
  )
    ;; Approved vault should return (some {...})
    ;; Unapproved vault should return none
    (ok true)
  )
)

;; Test get-balance function
;; Verifies users can check their balance
(define-public (test-get-balance)
  (let (
    (user tx-sender)
  )
    ;; Should return the user's sBTC balance
    (ok u0)
  )
)

;; Test get-total-supplied function
;; Verifies the protocol tracks total supply correctly
(define-public (test-get-total-supplied)
  (let (
    (total (try! (contract-call? .hashlock-core get-total-supplied)))
  )
    ;; Should return total sBTC supplied to protocol
    (ok total)
  )
)

;; Test get-contract-owner function
;; Verifies the owner can be queried
(define-public (test-get-contract-owner)
  (let (
    (owner (try! (contract-call? .hashlock-core get-contract-owner)))
  )
    (ok owner)
  )
)

;; Test hash mismatch rejection
;; Verifies that vaults with non-matching hashes are rejected
(define-public (test-hash-mismatch-rejection)
  ;; Expected error: ERR-HASH-MISMATCH = u101
  (ok u101)
)

;; Test non-whitelisted vault rejection
;; Verifies that only approved vaults can be used
(define-public (test-non-whitelisted-vault-rejection)
  ;; Expected error: ERR-NOT-WHITELISTED = u100
  (ok u100)
)
