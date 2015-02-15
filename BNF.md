BNF from http://programminglinq.info/tag/bnf/
=============================================

query-expression ::= from-clause query-body

query-body ::=

query-body-clause* final-query-clause query-continuation?

query-body-clause ::=
(from-clause
| join-clause
| let-clause
| where-clause
| orderby-clause)

from-clause ::= from itemName in srcExpr

join-clause ::= join itemName in srcExpr on keyExpr equals keyExpr
(into itemName)?

let-clause ::= let itemName = selExpr

where-clause ::= where predExpr

orderby-clause ::= orderby (keyExpr (ascending | descending)?)*

final-query-clause ::=
(select-clause | groupby-clause)

select-clause ::= select selExpr

groupby-clause ::= group selExpr by keyExpr

query-continuation ::= into itemName query-body
