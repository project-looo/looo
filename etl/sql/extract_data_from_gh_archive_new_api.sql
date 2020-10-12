WITH
  export_commit_data AS(
  SELECT
    event_id,
    event_type,
    created_at,
    repo_name,
    repo_id,
    repo_url,
    push_id,
    actor_name,
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
            '$.commits') array_commits
      FROM
        `githubarchive.{}.{}`
      WHERE
        type='PushEvent' )))

SELECT
  event_id,
  event_type,
  created_at,
  repo_id,
  repo_name,
  repo_url,
  repo_name AS repo_fullname,
  push_id,
  actor_name,
  commit_data,
  JSON_EXTRACT_SCALAR(commit_data,
    "$.sha") AS commit_sha,
  JSON_EXTRACT_SCALAR(commit_data,
    "$.author.email") AS email,
  REGEXP_EXTRACT(JSON_EXTRACT_SCALAR(commit_data,
      "$.author.email"), "@(.*)") AS email_domain,
  REGEXP_REPLACE(LOWER(TRIM(REGEXP_EXTRACT(JSON_EXTRACT_SCALAR(commit_data,
            "$.author.email"), "@(.*)"))), "[^a-zA-Z0-9\\\\.]+", "") AS email_domain_cleaned
FROM (
  SELECT
    event_id,
    event_type,
    created_at,
    repo_name,
    repo_id,
    repo_url,
    repo_name AS repo_fullname,
    push_id,
    actor_name,
    commit_data,
  FROM
    export_commit_data
  CROSS JOIN
    UNNEST(export_commit_data.commit_data) AS commit_data )