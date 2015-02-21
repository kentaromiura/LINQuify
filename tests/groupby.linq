from student in [
  { name : 'A', lastName: 'A'},
  { name : 'B', lastName: 'A'},
  { name : 'A', lastName: 'C'},
  { name : 'A', lastName: 'D'}
]
group student by student.lastName
