---
title: Overview
source: https://orm.drizzle.team/docs/overview
description: Why Drizzle ORM - a headless TypeScript ORM
---

# Drizzle ORM

Drizzle ORM is a headless TypeScript ORM with a head. 🐲

> Drizzle is a good friend who's there for you when necessary and doesn't bother when you need some space.

It looks and feels simple, performs on day *1000* of your project,
lets you do things your way, and is there when you need it.

**It's the only ORM with both [relational](/docs/rqb) and [SQL-like](/docs/select) query APIs**, providing you the best of both worlds when it comes to accessing your relational data. Drizzle is lightweight, performant, typesafe, non-lactose, gluten-free, sober, flexible and **serverless-ready by design**. Drizzle is not just a library, it's an experience. 🤩

## Headless ORM?

First and foremost, Drizzle is a library and a collection of complementary opt-in tools.

**ORM** stands for *object relational mapping*, and developers tend to call Django-like or Spring-like tools an ORM. We truly believe it's a misconception based on legacy nomenclature, and we call them **data frameworks**.

**Drizzle** lets you build your project the way you want, without interfering with your project or structure.

Using Drizzle you can define and manage database schemas in TypeScript, access your data in a SQL-like or relational way, and take advantage of opt-in tools to push your developer experience *through the roof*. 🤯

## Why SQL-like?

**If you know SQL, you know Drizzle.**

Drizzle embraces SQL and built Drizzle to be SQL-like at its core, so you can have zero to no learning curve and access to the full power of SQL.

We bring all the familiar **[SQL schema](/docs/sql-schema-declaration)**, **[queries](/docs/select)**, **[automatic migrations](/docs/migrations)** and **[one more thing](/docs/rqb)**. ✨

## Why Not SQL-like?

We're always striving for a perfectly balanced solution, and while SQL-like does cover 100% of the needs, there are certain common scenarios where you can query data in a better way.

We've built the **[Queries API](/docs/rqb)** for you, so you can fetch relational nested data from the database in the most convenient and performant way, and never think about joins and data mapping.

**Drizzle always outputs exactly 1 SQL statement.** Feel free to use it with serverless databases and never worry about performance or roundtrip costs!

## Serverless?

**Drizzle has exactly 0 dependencies!**

Drizzle ORM is dialect-specific, slim, performant and serverless-ready **by design**.

We support all major **[PostgreSQL](/docs/get-started-postgresql)**, **[MySQL](/docs/get-started-mysql)**, **[SQLite](/docs/get-started-sqlite)** or **[SingleStore](/docs/get-started-singlestore)** drivers out there.
