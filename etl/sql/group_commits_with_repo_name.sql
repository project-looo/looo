SELECT
  email_domain_cleaned AS domain,
  repo_id,
  COUNT(DISTINCT commit_sha) AS commit_count
FROM
  `codersrank.project_looc_raw.commit_data_with_emails_201301`
WHERE
  REGEXP_CONTAINS(email_domain_cleaned, r"{regex}") is false
  AND email_domain_cleaned != ""
  AND email_domain_cleaned != "."
  AND email_domain_cleaned not in {skip_domain_list}
GROUP BY
  email_domain_cleaned,
  repo_name
ORDER BY
  domain,
  commit_count DESC