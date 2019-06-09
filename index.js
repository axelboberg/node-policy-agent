/**
 * Axel Boberg © 2019
 */

const should = require('./lib/should')

class Agent {
  constructor (policy, opts) {
    this._policy = policy
    this._opts = opts
  }

  /**
   * Authorize some input data
   * 
   * @param { Object } input
   *//**
   * Authorize some input data
   * 
   * @param { Object } input
   * @param { Object } opts
   *//**
   * Authorize some input data
   * using a policy
   * 
   * @param { Object } input
   * @param { Array<Array<Function>> } policy
   *//**
   * Authorize some input data
   * using a policy
   * 
   * @param { Object } input
   * @param { Array<Array<Function>> } policy
   * @param { Object } opts
   */
  authorize (...args) {
    let input,
        output = {},
        policy = this._policy || [],
        opts = this._opts || {}
    
    /**
     * Extract parameters from arguments
     */
    if (args.length === 1) input = args[0]
    if (args.length === 2 && Array.isArray(args[1])) [ input, policy ] = args
    if (args.length === 2 && !Array.isArray(args[1])) [ input, opts ] = args
    if (args.length === 3) [ input, policy, opts ] = args

    if (!policy || !Array.isArray(policy)) {
      throw new TypeError('Policy must be an array')
    }

    let grantedBy

    for (let block of policy) {
      let granted = true

      for (let func of block) {
        const res = func(input, output)

        /**
         * Break as soon as a policy
         * has failed to prove true
         */
        if (!res) {
          granted = false
          break
        }
      }

      if (granted) {
        grantedBy = block
        break
      }
    }

    if (opts.detailedResponse) {
      const res = {
        granted: !!grantedBy,
        output: output
      }

      if (grantedBy) res.policy = grantedBy
      return res
    }
    return !!grantedBy
  }
}

module.exports = Agent
module.exports.Agent = Agent
module.exports.should = should