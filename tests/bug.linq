from x in [1,2,3]
where x > 1
from x2 in [4,6,8]
where x + 4 >= x2
select {x: x + 3, y: x2}
