/**
 * Axel Boberg © 2019
 */

/**
 * Find a value by path in an object
 * 
 * @param { Object } obj 
 * @param { Array<String|Number> } path
 * @returns { Any? }
 *//**
 * Find a value by path in an object
 * 
 * @param { Object } obj 
 * @param { String } path 
 * @param { String? } delimiter Used to split the path, defaults to '.'
 * @returns { Any? }
 */
function findByPath (obj, path, delimiter = '.') {
  if (typeof path === 'string') path = path.split(delimiter)
  if (path.length === 0) return obj

  let cur = path.shift()

  /**
   * If object is an array,
   * parse the index as a number
   */
  if (Array.isArray(obj)) {
    cur = parseInt(cur)
  } 

  if (!obj[cur]) return null
  return findByPath(obj[cur], path, delimiter)
}

/**
 * Wrap helper functions to be able
 * to access the input object and be
 * presented to the user with a
 * simple footprint
 * 
 * @param { Function } func A helper function to wrap, should return a boolean
 */
function wrapper (func) {
  
  // Presented to the user
  return function (...args) {

    // Presented to the authorization-function
    return function (input) {
      const scope = {
        input: input
      }
      
      /**
       * Loop through the arguments and
       * try to extract data from the input-object
       * if argument is a path-string, that is,
       * starting with a single '$'
       */
      const transformedArgs = args
        .map(arg => {
          if (typeof arg !== 'string') return arg
          if (!arg.match(/^\${1}/)) return arg
  
          /**
           * Find data in input object
           * by the path-string
           */
          return findByPath(scope, arg.substr(1, arg.length - 1))
        })

      return func(...transformedArgs)
    }
  }
}

/**
 * Create a RegExp from a uri
 * that will match with the provided string
 * 
 * @param { String } uri 
 * @returns { RegExp }
 */
function regexFromUri (uri) {
  uri = uri.split(/\/:\w+/g).join('/[^\/]+')
  return new RegExp('^' + uri + '$')
}

/**
 * Remove the last character from a string
 * if it matches the provided char
 * 
 * @param { String } str 
 * @param { String } char 
 * @returns { String }
 */
function removeTrailingChar (str, char) {
  if (str[str.length - 1] !== char) return str
  return str.substr(0, str.length - 1)
}

// Check if two values are equal
exports.equal = wrapper((val1, val2) => val1 === val2)

// Check if two objects are equal
exports.matchObject = wrapper((obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2))

// Check if string matches regex
exports.matchRegex = wrapper((str, regex) => {
  if (!regex instanceof RegExp) throw new TypeError('The second argument must be a valid regular expression')
  return regex.test(str)
})

// Check if urls match
exports.matchUri = wrapper((val1, val2) => {
  val1 = removeTrailingChar(val1, '/')
  val2 = removeTrailingChar(val2, '/')

  return regexFromUri(val2).test(val1)
})

// Check if val1 is less than val2
exports.beLessThan = wrapper((val1, val2) => val1 < val2)

// Check if val1 is more than val2
exports.beMoreThan = wrapper((val1, val2) => val1 > val2)

// Check if array or string contains value
exports.contain = wrapper((set, val) => {
  if (!Array.isArray(set) && typeof set !== 'string') {
    throw new TypeError('First argument must be an array or a string')
  }
  return set.indexOf(val) !== -1
})