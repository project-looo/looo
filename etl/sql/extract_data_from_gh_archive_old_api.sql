WITH
  export_commit_data AS(
  SELECT
    event_id,
    event_type,
    created_at,
    repo_name,
    repo_id,
    repo_url,
    actor_name,
    push_id,
    commit_data
  FROM (
    SELECT
      *,
      ARRAY(
      SELECT
        JSON_EXTRACT(x,
          '$')
      FROM
        UNNEST(array_commits) x) AS commit_data
    FROM (
      SELECT
        id AS event_id,
        type AS event_type,
        created_at,
        repo.name AS repo_name,
        repo.id AS repo_id,
        repo.url AS repo_url,
        actor.login AS actor_name,
        JSON_EXTRACT_SCALAR(payload,
          "$.push_id") AS push_id,
        JSON_EXTRACT_ARRAY(payload,
            '$.shas') AS array_commits
      FROM
        `githubarchive.{}.{}`
      WHERE
        type='PushEvent'
        AND JSON_EXTRACT(payload,
          "$.shas") IS NOT NULL )))
SELECT
  event_id,
  event_type,
  created_at,
  repo_id,
  repo_name,
  repo_url,
  REGEXP_REPLACE(repo_url, "https://github.com/|https://api.github.dev/repos/", "") AS repo_fullname,
  push_id,
  actor_name,
  commit_data,
  JSON_EXTRACT_SCALAR(commit_data,
    "$[0]") AS commit_sha,
  JSON_EXTRACT_SCALAR(commit_data,
    "$[1]") AS email,
  REGEXP_EXTRACT(JSON_EXTRACT_SCALAR(commit_data,
      "$[1]"), "@(.*)") AS email_domain,
  REGEXP_REPLACE(LOWER(TRIM(REGEXP_EXTRACT(JSON_EXTRACT_SCALAR(commit_data,
      "$[1]"), "@(.*)"))), "[^a-zA-Z0-9\\\\.]+", "") as email_domain_cleaned
FROM (
  SELECT
    event_id,
    event_type,
    created_at,
    repo_name,
    repo_id,
    repo_url,
    push_id,
    actor_name,
    commit_data,
  FROM
    export_commit_data
  CROSS JOIN
    UNNEST(export_commit_data.commit_data) AS commit_data )