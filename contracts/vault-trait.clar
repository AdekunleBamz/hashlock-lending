(define-trait vault
  (
    ;; Signatures for functions expected from a vault
    (get-template-source () (response ok principal))
    ;; Add any other functions that hashlock-core needs to call on a vault contract
  )
)
