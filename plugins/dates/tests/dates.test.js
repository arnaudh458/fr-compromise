import test from 'tape'
import nlp from './_lib.js'
let here = '[fr-dates] '

const arr = [
  [`je suis né le 2 septembre 1982`, ''], // September 2nd, 1982
  [`Je travaille jusqu’en juin.`, ''], //  until June
  [`Il n’y a pas d’augmentation prévue jusqu’en 2032`, ''], // until 2023
  [`Je suis en vacances jusqu’au 3 janvier.`, ''], // until 3rd january
  [`Je peux t’emprunter ta voiture jusqu’à lundi prochain`, ''], // until next monday
  ['Nous avons acheté la maison le 15 avril 2013.', ''], // April 15th , 2012
  ['Le 1er mai est un jour férié en France', ''], // May 1st
  ['Je vais y aller le premier décembre 2014.', ''], // December 1st, 2024
  ['Aujourd’hui, c’est le 8 septembre 2014.', ''], // September 8th, 2014
  ['Nous sommes le 1er février aujourd’hui.', ''], // February 1st (today)
  ['Nous sommes le vendredi 1er février aujourd’hui', ''], // Friday, February 1st (today)
  ['15/12/2020', ''], // = December 15th, 2020
  ['Le 6 avril', ''], // April 6th
  ['Mercredi 11 mars', ''], // Wednesday, March 11th
  ['12/06/2020', ''],// = June 12th, 2020
  ['Halloween est le 31 octobre.', ''], // October 31th
  ['C’est le quatorze juillet.', ''], // July 14th
  [`c'est le premier janvier`, ''], // January  1st
  ['le 5 juin 2012', ''], // June, 5th 2012
  ['5/6/2012 June 5, 2012', ''], // June 5th, 2012
  ['6/5/2012', ''], // May 6th, 2023
  ['le 25 décembre 2012', ''], // December 25th, 2012
  ['25/12/2012 December 25, 2012', ''], // December 25th, 2012
  ['12/15/2012', ''], // NOT EXIST IN FRENCH,  we can  maybe parse in english format December 15th, 2012
  ['le 3 november 2012', ''], // November 3rd, 2012
  ['11/03/2012 November 3, 2021', ''], // March 11th, 2012 // November 3rd, 2021  (!=)
  ['3/11/21', ''], // November 3rd, 2021
  ['entre sept et oct', ''], // between september and october
]
test('dates:', function (t) {
  arr.forEach(a => {
    let doc = nlp(a[0])
    t.equal(doc.has('#Date'), true, here + `has-date: '${a[0]}'`)
    // let json = doc.dates().json({ terms: false })[0]
    // t.equal(json.dates.start)
  })
  t.end()
})
