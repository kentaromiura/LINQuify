from n in ['bob', 'frank', 'cristian']
let noVowel = n.replace(/[aeiou]/gi,'')
where noVowel.length > 2
select n
