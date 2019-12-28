import React from 'react'

//| This is a custom aggregator that
//| takes in an array of values and
//| returns the rounded median
//|------------------------------------------------------------------------
export default function roundedMedian(values) {
  let min = values[0] || ''
  let max = values[0] || ''

  values.forEach(value => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}