;; IsolatedFlashVault-v1
;; Example whitelisted template for flash loans
;; Inherits safe-vault-base logic

(use-trait asset-trait .safe-vault-base.asset-trait)

(define-constant ERR-FLASH-LOAN-FEE (err u300))
(define-constant FLASH-LOAN-FEE u10)  ;; 0.1% fee example

(define-map vault-balances
  principal  ;; asset
  uint
)

;; Deposit into vault
(define-public (deposit (asset <asset-trait>) (amount uint))
  (try! (contract-call? asset transfer amount tx-sender (as-contract tx-sender) none))
  (map-set vault-balances (contract-of asset)
    (+ (default-to u0 (map-get? vault-balances (contract-of asset))) amount))
  (ok true)
)

;; Flash loan: borrow, execute, repay + fee
(define-public (flash-loan (asset <asset-trait>) (amount uint) (callback principal) (callback-data (buff 1024)))
  (let ((initial-balance (default-to u0 (map-get? vault-balances (contract-of asset))))
        (fee (/ (* amount FLASH-LOAN-FEE) u10000)))
    ;; Transfer to callback
    (try! (as-contract (contract-call? asset transfer amount tx-sender callback none)))
    ;; Call callback (user's contract must repay + fee)
    (try! (contract-call? callback execute-flash-loan (contract-of asset) amount fee callback-data))
    ;; Check repayment
    (let ((final-balance (default-to u0 (map-get? vault-balances (contract-of asset)))))
      (asserts! (>= final-balance (+ initial-balance fee)) ERR-FLASH-LOAN-FEE)
      (ok true)
    )
  )
)

;; Withdraw (only for lenders, simplified)
(define-public (withdraw (asset <asset-trait>) (amount uint) (recipient principal))
  (let ((balance (default-to u0 (map-get? vault-balances (contract-of asset)))))
    (asserts! (>= balance amount) ERR-INSUFFICIENT-BALANCE)
    (try! (as-contract (contract-call? asset transfer amount tx-sender recipient none)))
    (map-set vault-balances (contract-of asset) (- balance amount))
    (ok true)
  )
)

;; Inherit safe external call
(define-public (safe-external-call (target principal) (asset <asset-trait>) (amount uint) (recipient principal))
  (contract-call? .safe-vault-base safe-external-call target asset amount recipient)
)

;; Template source
(define-public (get-template-source)
  (ok (as-contract tx-sender))
)
