import type { SkillAreaData } from "../../types/skills";
import { Database } from "lucide-react";

export const databaseArea: SkillAreaData = {
  id: "database",
  label: "Database",
  icon: Database,
  description:
    "SQL, NoSQL, Redis, indexing, transactions, schema design, and scaling — choose your database to dive deep.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "migrate", label: "All schema changes via versioned migrations" },
    { id: "index", label: "Foreign keys and frequently-filtered columns indexed" },
    { id: "pool", label: "Connection pooling configured correctly" },
    { id: "backup", label: "Automated backups + restore tested" },
    { id: "txn", label: "Transactions used for multi-step writes" },
    { id: "explain", label: "EXPLAIN ANALYZE run on slow queries" },
    { id: "injection", label: "Parameterized queries — no string concatenation" },
    { id: "least", label: "DB user has least-privilege access (no DROP in app user)" },
  ],
  subAreas: [
    {
      id: "postgresql",
      label: "PostgreSQL",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["postgresql", "postgres", "sql", "database"],
      concepts: [
        {
          title: "ACID Transactions",
          body: "PostgreSQL is fully ACID-compliant. Atomicity ensures all-or-nothing writes. Consistency enforces constraints. Isolation controls visibility between concurrent transactions (Read Committed default). Durability guarantees committed data survives crashes via WAL.",
        },
        {
          title: "B-Tree & Other Index Types",
          body: "B-Tree (default): sorted tree for =, <, >, BETWEEN, LIKE 'foo%'. GIN: for arrays, JSONB, full-text search. GiST: geometric data, range types. Hash: equality-only, rarely preferred. Partial indexes add a WHERE clause to index only relevant rows — reduces size and maintenance overhead.",
        },
        {
          title: "EXPLAIN ANALYZE",
          body: "EXPLAIN shows the query plan (estimated). EXPLAIN ANALYZE actually executes and shows real timings. Look for Seq Scan on large tables (missing index), Nested Loop on huge joins (use Hash Join), and high actual vs estimated row counts (stale statistics — run ANALYZE).",
        },
        {
          title: "MVCC (Multi-Version Concurrency Control)",
          body: "PostgreSQL never overwrites rows in place — it creates new versions. Readers never block writers and writers never block readers. Old row versions are cleaned up by VACUUM. Long-running transactions bloat tables by preventing VACUUM from reclaiming dead tuples.",
        },
        {
          title: "JSONB vs JSON",
          body: "JSON stores raw text (preserves formatting, supports duplicate keys). JSONB stores parsed binary — supports GIN indexing, operators (@>, ?), and is faster to query. Always use JSONB unless you need to preserve exact JSON formatting. Index with: CREATE INDEX ON t USING GIN (col).",
        },
        {
          title: "Connection Pooling (PgBouncer)",
          body: "PostgreSQL spawns a process per connection — expensive at scale. PgBouncer pools connections in transaction or session mode. Transaction mode is most efficient (connections shared between requests) but incompatible with prepared statements and advisory locks. Use pgBouncer or built-in pool in ORMs.",
        },
      ],
      resources: [
        {
          label: "PostgreSQL Docs",
          url: "https://www.postgresql.org/docs/",
          desc: "Full PostgreSQL SQL reference and administration guide.",
        },
        {
          label: "Use The Index, Luke",
          url: "https://use-the-index-luke.com",
          desc: "SQL indexing for developers — no DBA required.",
        },
        {
          label: "Postgres Weekly",
          url: "https://postgresweekly.com",
          desc: "Weekly newsletter with PostgreSQL tips, releases, and articles.",
        },
        {
          label: "pganalyze Blog",
          url: "https://pganalyze.com/blog",
          desc: "Deep dives on PostgreSQL performance, EXPLAIN, and vacuuming.",
        },
      ],
      checklist: [
        { id: "pg-index", label: "Indexes on all foreign keys and filtered columns" },
        { id: "pg-explain", label: "EXPLAIN ANALYZE run on queries touching > 10k rows" },
        { id: "pg-vacuum", label: "autovacuum enabled; bloat monitored" },
        { id: "pg-pool", label: "Connection pooling (PgBouncer or ORM pool) configured" },
        { id: "pg-txn", label: "Multi-step writes wrapped in explicit transactions" },
        { id: "pg-prepared", label: "Parameterized queries only — no string interpolation" },
        { id: "pg-backup", label: "Automated backups with point-in-time recovery tested" },
        { id: "pg-rls", label: "Row-Level Security enabled if multi-tenant data model" },
        { id: "pg-jsonb", label: "JSONB used (not JSON) with GIN index where queried" },
        { id: "pg-migrate", label: "All schema changes via versioned migration files" },
      ],
    },
    {
      id: "mysql",
      label: "MySQL / MariaDB",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["mysql", "mariadb", "sql", "database"],
      concepts: [
        {
          title: "InnoDB Storage Engine",
          body: "InnoDB is the default (and recommended) storage engine. It provides ACID transactions, row-level locking, foreign key constraints, and MVCC. MyISAM is the legacy engine — no transactions, table-level locking. Always use InnoDB for production workloads.",
        },
        {
          title: "Index Types & Composite Indexes",
          body: "MySQL B-Tree indexes support =, <, >, BETWEEN, LIKE 'prefix%'. Composite index (a, b, c) works for queries on (a), (a,b), (a,b,c) — the leftmost prefix rule. FULLTEXT indexes support natural language search. Use EXPLAIN to verify index usage and avoid full table scans.",
        },
        {
          title: "Query Optimization & EXPLAIN",
          body: "EXPLAIN SELECT shows the execution plan. Key columns: type (ALL=full scan, ref=index lookup, eq_ref=unique), possible_keys, key (actually used), rows (estimate). Avoid SELECT * — fetch only needed columns. Use covering indexes to avoid table lookups entirely.",
        },
        {
          title: "Replication & Scaling",
          body: "MySQL supports primary-replica replication (async by default). Reads scale horizontally via replicas; writes go to primary. Semi-sync replication reduces data loss risk. For horizontal write scaling, use Vitess or MySQL Cluster. Read-heavy apps benefit greatly from read replicas behind a load balancer.",
        },
        {
          title: "Transactions & Isolation Levels",
          body: "InnoDB supports all 4 SQL isolation levels: READ UNCOMMITTED (dirty reads), READ COMMITTED (no dirty reads), REPEATABLE READ (default, no phantom reads via gap locks), SERIALIZABLE (full locking). REPEATABLE READ + gap locks prevent phantom reads in InnoDB — different from PostgreSQL's REPEATABLE READ.",
        },
        {
          title: "JSON Column Type",
          body: "MySQL 5.7+ supports a native JSON column type with JSON_EXTRACT(), ->, and ->> operators. Generated columns can index specific JSON paths: ALTER TABLE t ADD COLUMN name VARCHAR(100) AS (data->>'$.name'), ADD INDEX (name). MariaDB has similar support with slight syntax differences.",
        },
      ],
      resources: [
        {
          label: "MySQL Docs",
          url: "https://dev.mysql.com/doc/",
          desc: "Official MySQL reference manual and guides.",
        },
        {
          label: "MariaDB Knowledge Base",
          url: "https://mariadb.com/kb/en/",
          desc: "MariaDB documentation and community knowledge base.",
        },
        {
          label: "Planet MySQL",
          url: "https://planet.mysql.com",
          desc: "Aggregated blog posts from MySQL community and Oracle engineers.",
        },
      ],
      checklist: [
        { id: "my-innodb", label: "All tables use InnoDB engine (not MyISAM)" },
        { id: "my-index", label: "EXPLAIN shows no full table scans on production queries" },
        { id: "my-charset", label: "utf8mb4 charset (not utf8) for full Unicode support" },
        { id: "my-prepared", label: "Prepared statements used — no string concatenation" },
        { id: "my-txn", label: "Multi-step writes in explicit transactions with rollback on error" },
        { id: "my-strict", label: "sql_mode includes STRICT_TRANS_TABLES" },
        { id: "my-backup", label: "Backups via mysqldump or Percona XtraBackup on schedule" },
      ],
    },
    {
      id: "mongodb",
      label: "MongoDB",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["mongodb", "nosql", "database"],
      concepts: [
        {
          title: "Document Model",
          body: "MongoDB stores data as BSON documents (binary JSON) grouped into collections. Documents in a collection need not share the same schema. Embed related data that is always read together; reference (store ObjectId) data that is large, updated independently, or has unbounded growth.",
        },
        {
          title: "Indexes",
          body: "Every query should use an index. Single field, compound (order and direction matter for sort), multikey (array elements), text (full-text), 2dsphere (geospatial), wildcard. Use explain('executionStats') to verify IXSCAN vs COLLSCAN. The ESR rule for compound index order: Equality → Sort → Range.",
        },
        {
          title: "Aggregation Pipeline",
          body: "The aggregation pipeline transforms documents through ordered stages: $match (filter early), $group (accumulate), $project (reshape), $lookup (join), $unwind (flatten arrays), $sort, $limit, $skip. Always $match first to reduce documents before expensive stages. Use $facet for parallel branches.",
        },
        {
          title: "Transactions (Multi-document)",
          body: "MongoDB 4.0+ supports ACID multi-document transactions via sessions. Use sparingly — they have higher overhead than single-document operations (which are always atomic). If you frequently need multi-document transactions, your schema may be over-normalized — consider embedding.",
        },
        {
          title: "Read/Write Concerns",
          body: "Write concern: { w: 'majority' } ensures writes are acknowledged by a majority of replica set members before returning — protects against data loss. Read concern: 'majority' reads only data acknowledged by majority. For strong consistency use both. Default w:1 is fast but risks rollback on primary failure.",
        },
        {
          title: "Schema Design Patterns",
          body: "Embedding: one-to-few, data accessed together, immutable sub-documents. Referencing: one-to-many with large sub-documents, many-to-many. Bucket pattern: group time-series data into buckets (e.g., 1 doc per hour per sensor). Outlier pattern: handle documents that exceed typical size with an overflow flag.",
        },
      ],
      resources: [
        {
          label: "MongoDB Docs",
          url: "https://www.mongodb.com/docs/",
          desc: "Official MongoDB documentation with full driver and aggregation reference.",
        },
        {
          label: "MongoDB University",
          url: "https://learn.mongodb.com",
          desc: "Free courses on schema design, aggregation, performance, and more.",
        },
        {
          label: "MongoDB Blog",
          url: "https://www.mongodb.com/blog",
          desc: "Engineering posts on schema patterns, Atlas features, and performance.",
        },
      ],
      checklist: [
        { id: "mg-index", label: "All query fields covered by an index (no COLLSCAN in prod)" },
        { id: "mg-embed", label: "Schema reviewed: embed vs reference decision documented" },
        { id: "mg-concern", label: "w: 'majority' write concern for critical writes" },
        { id: "mg-match", label: "$match appears first in every aggregation pipeline" },
        { id: "mg-txn", label: "Multi-document transactions used only where truly needed" },
        { id: "mg-ttl", label: "TTL index on time-expiring documents (sessions, logs)" },
        { id: "mg-replicaset", label: "Running as replica set (not standalone) in production" },
        { id: "mg-auth", label: "Authentication enabled; no anonymous access" },
      ],
    },
    {
      id: "redis",
      label: "Redis",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["redis", "cache", "nosql", "database"],
      concepts: [
        {
          title: "Data Structures",
          body: "Redis is a data structure server, not just a key-value store. String (counters, JSON blobs), List (queues, timelines), Set (unique members, tags), Sorted Set (leaderboards, rate limiting), Hash (object fields), Stream (event log), HyperLogLog (cardinality estimation), Bitmap (feature flags per user ID).",
        },
        {
          title: "Expiry & Eviction",
          body: "SET key value EX 300 sets a 5-minute TTL. EXPIRE key 300 adds TTL to existing key. When memory fills, eviction policies kick in: noeviction (errors on writes), allkeys-lru (evict least recently used — good for caching), volatile-lru (evict only keys with TTL). Choose policy based on your use case.",
        },
        {
          title: "Persistence: RDB vs AOF",
          body: "RDB: point-in-time snapshots (compact, fast restore, risk of data loss since last snapshot). AOF: append-only log of every write command (durable, larger files, slower restore). Use both: AOF for durability, RDB for fast disaster recovery. AOF with appendfsync everysec balances durability and performance.",
        },
        {
          title: "Pub/Sub & Streams",
          body: "Pub/Sub: fire-and-forget message broadcasting. No persistence, no delivery guarantees — subscribers miss messages if offline. Streams (Redis 5+): durable, consumer-group based, persistent message log — like a lightweight Kafka. Use Streams for reliable event queuing; Pub/Sub only for ephemeral notifications.",
        },
        {
          title: "Atomic Operations & Lua Scripts",
          body: "All Redis commands are single-threaded and atomic. Use INCR for counters, SETNX for distributed locks (or SET key value NX EX ttl). For multi-command atomicity, use MULTI/EXEC (transactions) or Lua scripts (EVAL) — the script runs atomically on the server without round trips.",
        },
        {
          title: "Cluster vs Sentinel",
          body: "Sentinel: monitors a primary-replica setup, handles automatic failover, provides service discovery. Good for high availability without sharding. Cluster: auto-shards data across multiple nodes (16384 hash slots), built-in replication per shard. Use Cluster when dataset exceeds single-node memory or for horizontal write scaling.",
        },
      ],
      resources: [
        {
          label: "Redis Docs",
          url: "https://redis.io/docs/",
          desc: "Official Redis command reference and data structure guides.",
        },
        {
          label: "Redis University",
          url: "https://university.redis.com",
          desc: "Free courses on Redis data structures, performance, and use cases.",
        },
        {
          label: "Redis Best Practices",
          url: "https://redis.io/docs/manual/patterns/",
          desc: "Official patterns for caching, pub/sub, queues, and rate limiting.",
        },
      ],
      checklist: [
        { id: "rd-ttl", label: "All cache keys have appropriate TTLs set" },
        { id: "rd-eviction", label: "Eviction policy set correctly for use case (allkeys-lru for cache)" },
        { id: "rd-persist", label: "Persistence configured (AOF + RDB for durability)" },
        { id: "rd-sentinel", label: "Sentinel or Cluster configured for HA (no standalone in prod)" },
        { id: "rd-auth", label: "AUTH password / ACL users configured" },
        { id: "rd-maxmemory", label: "maxmemory limit set to prevent OOM crashes" },
        { id: "rd-serialize", label: "Values serialized consistently (JSON/msgpack); no mixed formats" },
      ],
    },
    {
      id: "sqlite",
      label: "SQLite",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["sqlite", "sql", "database"],
      concepts: [
        {
          title: "Serverless & Embedded",
          body: "SQLite runs in-process — no network, no server, no authentication. The entire database is a single file. Perfect for: mobile apps, desktop apps, CLIs, test environments, embedded devices, and edge/serverless environments (Cloudflare D1, Turso). Not suitable for high-concurrency web servers.",
        },
        {
          title: "WAL Mode",
          body: "The default journal mode (DELETE) locks the entire database on writes. WAL (Write-Ahead Logging) mode allows concurrent readers while a writer is active — dramatically improves read throughput: PRAGMA journal_mode=WAL. WAL is almost always the right choice for apps with concurrent reads.",
        },
        {
          title: "Type Affinity",
          body: "SQLite uses type affinity, not strict types. A column declared INTEGER can store text. SQLite 3.37+ adds STRICT tables for true type enforcement. This flexibility is a footgun — values stored as text won't sort numerically. Use STRICT tables for new schemas or validate types at the application layer.",
        },
        {
          title: "Concurrency Limits",
          body: "SQLite allows one writer at a time — writes are serialized. For read-heavy workloads, WAL mode helps. For write-heavy or multi-process workloads, SQLite is the wrong choice — use PostgreSQL. Exception: Turso/LiteFS enable distributed SQLite with leader-based writes and read replicas.",
        },
        {
          title: "Tooling & Ecosystem",
          body: "Drizzle ORM, Prisma, and Knex all support SQLite. Turso provides serverless globally-distributed SQLite. Cloudflare D1 is serverless SQLite at the edge. Bun ships with a built-in SQLite driver. For local development, sqlite3 CLI or DB Browser for SQLite are the standard inspection tools.",
        },
      ],
      resources: [
        {
          label: "SQLite Docs",
          url: "https://www.sqlite.org/docs.html",
          desc: "Definitive SQLite reference — surprisingly readable.",
        },
        {
          label: "Turso",
          url: "https://turso.tech",
          desc: "Distributed SQLite at the edge — free tier available.",
        },
        {
          label: "SQLite WAL Mode",
          url: "https://www.sqlite.org/wal.html",
          desc: "Official WAL documentation — understand before enabling.",
        },
      ],
      checklist: [
        { id: "sq-wal", label: "WAL mode enabled (PRAGMA journal_mode=WAL)" },
        { id: "sq-strict", label: "STRICT tables used (SQLite 3.37+) or app-level type validation" },
        { id: "sq-txn", label: "Bulk writes batched inside transactions (not row-by-row)" },
        { id: "sq-backup", label: "Database file backed up (copy or .backup command)" },
        { id: "sq-index", label: "Indexes on commonly queried/sorted columns" },
        { id: "sq-migrate", label: "Schema changes via versioned migration scripts" },
      ],
    },
  ],
};
