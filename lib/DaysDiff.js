module.exports = class DaysDiff {
  /**
   * @param {Date} a
   * @param {Date} b
   */
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  /**
   * @returns {number}
   */
  value () {
    return parseInt(
      (this.a.getTime() - this.b.getTime()) / (24 * 3600 * 1000)
    )
  }
}
