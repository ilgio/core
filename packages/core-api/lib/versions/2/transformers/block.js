'use strict'

const database = require('@arkecosystem/core-container').resolvePlugin('database')
const formatTimestamp = require('./utils/format-timestamp')

/**
 * Turns a "block" object into a generic object.
 * @param  {Object} model
 * @return {Object}
 */
module.exports = (model) => {
  const generator = database.walletManager.findByPublicKey(model.generatorPublicKey)

  return {
    id: model.id,
    version: +model.version,
    height: +model.height,
    previous: model.previousBlock,
    forged: {
      reward: +model.reward.toString(),
      fee: +model.totalFee.toString(),
      total: +model.reward.toString() + +model.totalFee.toString()
    },
    payload: {
      hash: model.payloadHash,
      length: model.payloadLength
    },
    generator: {
      username: generator.username,
      address: generator.address,
      publicKey: generator.publicKey
    },
    signature: model.blockSignature,
    confirmations: model.confirmations,
    transactions: model.numberOfTransactions,
    timestamp: formatTimestamp(model.timestamp)
  }
}
