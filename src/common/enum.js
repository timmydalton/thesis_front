export const ORDER_STATUS = Object.freeze({
  all: -1,
  new: 0,
  submitted: 1,
  shipped: 2,
  delivered: 3,
  returning: 4,
  returned: 5,
  canceled: 6,
  removed: 7,
  packing: 8,
  pending: 9,
  waitting: 11,
  wait_print: 12,
  printed: 13,
  part_returned: 15,
  received_money: 16,
  wait_submit: 17,
  ordered: 20,
  order_from_storecake: 21,
  order_draft: 22
})

export const ORDER_STATUS_ALLOW_EDIT = Object.freeze({
  new: 0,
  confirmed: 1,
  packing: 8,
  pending: 9,
  draft: 22
})