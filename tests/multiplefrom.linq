from lower in 'xyz'.split('')
where lower !== 'x'
from upper in 'ABC'.split('')
from static in '123'.split('')
select { lower: lower, upper: upper, static: static }
