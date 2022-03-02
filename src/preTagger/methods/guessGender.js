let masc = new Set([
  'le',
  'un',
  'du',
])
let femme = new Set([
  'la',
  'une',
])

const femaleEnds = ['anse', 'ette', 'esse', 'ance', 'eine', 'ure']
const maleEnds = ['age', 'isme', 'eau', 'ment', 'in', 'ou', 'et', 'ege', 'eme', 'ome', 'aume', 'age', 'isme', 'an', 'ent', 'ai', 'out', 'et', 'eu', 'ut', 'is', 'il', 'ex',
  // 't', 'x', 'd', 'l', 'f', 'm', 's',
]

const suffixGuess = function (term) {
  if (femaleEnds.find(suff => term.normal.endsWith(suff))) {
    return 'FemaleNoun'
  }
  if (maleEnds.find(suff => term.normal.endsWith(suff))) {
    return 'FemaleNoun'
  }
  return null
}

const fallback = function (term) {
  if (term.normal.endsWith('e')) {
    return 'FemaleNoun'
  }
  return 'MaleNoun' //-?
}

const lookLeft = function (terms, i) {
  for (let n = 1; n < 3; n += 1) {
    if (!terms[i - n]) {
      return null
    }
    let term = terms[i - n]
    if (masc.has(term.normal)) {
      return 'MaleNoun'
    }
    if (femme.has(term.normal)) {
      return 'FemaleNoun'
    }
  }
  return null
}

// look for a gendered adjective
const lookRight = function (terms, i) {
  for (let n = 1; n < 2; n += 1) {
    if (!terms[i + n]) {
      return null
    }
    let term = terms[i + n]
    if (term.tags.has('MaleAdjective')) {
      return 'MaleNoun'
    }
    if (term.tags.has('FemaleAdjective')) {
      return 'FemaleAdjective'
    }
  }
  return null
}

const guessGender = function (terms, i) {
  let { tags } = terms[i]
  if (!tags.has('Noun')) {
    return null
  }
  if (tags.has('MaleNoun')) {
    return 'MaleNoun'
  }
  if (tags.has('FemaleNoun')) {
    return 'FemaleNoun'
  }
  let found = lookLeft(terms, i)
  found = found || lookRight(terms, i)
  found = found || suffixGuess(terms[i])
  found = found || fallback(terms[i])
  return found
}
export default guessGender