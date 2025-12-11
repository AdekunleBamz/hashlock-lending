;; Hashlock-isolated-sbtc-v1.clar — Immutable flash-loan vault template
(define-constant FEE u9) ;; 0.09%
(define-constant ERR-REPAY (err u300))

(define-constant sbtc 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.sbtc)
(define-map reserves principal uint)

(define-public (deposit (amount uint))
  (let ((sender tx-sender))
    (try! (contract-call? sbtc transfer amount sender (as-contract tx-sender) none))
    (map-set reserves sbtc (+ (default-to u0 (map-get? reserves sbtc)) amount))
    (ok true)))

(define-public (get-template-source)
  (ok (as-contract tx-sender)))

(define-read-only (get-reserve)
  (default-to u0 (map-get? reserves sbtc)))
