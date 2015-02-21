LINQuify
========

I though that it would be nice to have linq integrated inside JavaScript,
when looking up for the [Backus-Naur Form](http://programminglinq.info/tag/bnf/), I notice that it's quite simple.

So I wrote a Proof of concept look ahead parser that supported select/let/where fine.
After seeing that is doable I decided to make this a proper project.

Also I wanted to try to make some experiments with ASTs, since in the past
I already did some look ahead parser, and I made some AST transforms,
but I never crossed the two.

I also wanted to implemented it incrementally as I don't have lot of time so
I'll probably work on it mostly on the week end.

Bear in mind that the Transformer code is highly experimental,
and it will probably change a lot,
especially when I'll implement joins and group by since they'll require some
more though.

My idea is making it work for any Array-like object, so in the final version
I'll use .call everywhere and I'll also probably implement a flag to allow using
any underscore-like library so that it will work on any browser that doesn't support
Array.Extras, also by doing that I'll enable it to run on any browser.

The good thing of using an AST is that potentially I can optimize the code before outputting the equivalent JS.

The main goal is allowing pre-transformation hooks when using require any js/es file in a cjs environment using tools like wrapup/browserify.

as of version 0.1 this is the supported table:

Support:
--------
- from-clause
- select-clause
- where-clause

Partial support:
----------------
- query-expression
- query-body
- final-query-clause


Unsupported:
------------
- query-body-clause
- query-continuation
- join-clause
- let-clause

- orderby-clause
- groupby-clause
- query-continuation



Build
=====
Running `make` will just install the npm dependency

Running `make run` will run a (very basic at the moment) test page in your browser.

Disclaimer
==========
This a personal project and is not endorsed or sponsored by any company.

LINQ is a technology developed by Microsoft and they own any possibly right on it.

If you feel this project is breaking any copyright/trademark, please contact me
in order to resolve it. Thanks.
