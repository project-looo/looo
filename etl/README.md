# Step 1: get the commits/domain
In the BigQuery a PushEvent looks something like this:
| type      | public | payload                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | repo.id  | repo.name | repo.url                           | actor.id | actor.login | actor.url                       |
|-----------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------|------------------------------------|----------|-------------|---------------------------------|
| PushEvent | true   | {"push_id":537278470,"size":1,"distinct_size":1,"ref":"refs/heads/master","head":"185ac10fcf1eb9c48e6f978cfdf5300f0ae541c8","before":"5a20b05d06032586f9b482e982ab709ce001709d","commits":[{"sha":"185ac10fcf1eb9c48e6f978cfdf5300f0ae541c8","author":{"email":"a454492e42fd9810e577ebee548c7e59bd883bca@live.com.au","name":"j-"},"message":"Rename core constructors","distinct":true,"url":"https://api.github.com/repos/j-/ok/commits/185ac10fcf1eb9c48e6f978cfdf5300f0ae541c8"}]} | 24749928 | j-/ok     | https://api.github.com/repos/j-/ok | 590992   | j-          | https://api.github.com/users/j- |
For us the payload column is important. That contains the emails. In our example it is a454492e42fd9810e577ebee548c7e59bd883bca@live.com.au. GitHub hashed the first part of the email, but this is not important for us now. We need only the domain from the email (live.com.au).

The query to count the commits/domain name looks like this:
```
## pre-2015 API
CREATE TEMP FUNCTION
 json2array(json STRING)
 RETURNS ARRAY<STRING>
 LANGUAGE js AS """
         return JSON.parse(json).map(x=>JSON.stringify(x));
       """;
WITH
 export_domains AS(
 SELECT
   DATE_TRUNC(DATE(created_at), month) AS month,
   emails,
   ARRAY(
   SELECT
     REGEXP_EXTRACT(x, "@(.*)")
   FROM
     UNNEST(emails) x
   WHERE
     REGEXP_EXTRACT(x, "@(.*)") IS NOT NULL) AS domains
 FROM (
   SELECT
     * EXCEPT(array_commits),
     ARRAY(
     SELECT
       JSON_EXTRACT_SCALAR(x,
         '$[1]')
     FROM
       UNNEST(array_commits) x) emails
   FROM (
     SELECT
       created_at,
       json2array(JSON_EXTRACT(payload,
           '$.shas')) array_commits
     FROM
       `githubarchive.day.20130101`
     WHERE
       type='PushEvent' )))
SELECT
 month,
 flattened_domains AS email_domain,
 COUNT(flattened_domains) AS domain_count
FROM (
 SELECT
   month,
   flattened_domains
 FROM
   export_domains
 CROSS JOIN
   UNNEST(export_domains.domains) AS flattened_domains )
GROUP BY
 month,
 email_domain
ORDER BY
 month,
 domain_count DESC
 ```

 After 2015 the format of the payload changed a but and requires a slightly different query:

```
## post-2015 API
CREATE TEMP FUNCTION
 json2array(json STRING)
 RETURNS ARRAY<STRING>
 LANGUAGE js AS """
         return JSON.parse(json).map(x=>JSON.stringify(x));
       """;
WITH
 export_domains AS(
 SELECT
   DATE_TRUNC(DATE(created_at), month) AS month,
   emails,
   ARRAY(
   SELECT
     REGEXP_EXTRACT(x, "@(.*)")
   FROM
     UNNEST(emails) x
   WHERE
     REGEXP_EXTRACT(x, "@(.*)") IS NOT NULL) AS domains
 FROM (
   SELECT
     * EXCEPT(array_commits),
     ARRAY(
     SELECT
       JSON_EXTRACT_SCALAR(x,
         '$.author.email')
     FROM
       UNNEST(array_commits) x) emails
   FROM (
     SELECT
       created_at,
       json2array(JSON_EXTRACT(payload,
           '$.commits')) array_commits
     FROM
       `githubarchive.day.20150102`
     WHERE
       type='PushEvent' )))
SELECT
 month,
 flattened_domains AS email_domain,
 COUNT(flattened_domains) AS domain_count
FROM (
 SELECT
   month,
   flattened_domains
 FROM
   export_domains
 CROSS JOIN
   UNNEST(export_domains.domains) AS flattened_domains )
GROUP BY
 month,
 email_domain
ORDER BY
 month,
 domain_count DESC
```
The result looks like this:
| month      | email_domain             | domain_count |
|------------|--------------------------|--------------|
| 2015-01-01 | gmail.com                |       131357 |
| 2015-01-01 | users.noreply.github.com |         8802 |
| 2015-01-01 | python.org               |         5786 |
| 2015-01-01 | hotmail.com              |         4942 |
| 2015-01-01 | fhda.edu                 |         3888 |
| 2015-01-01 | yahoo.com                |         3216 |
| 2015-01-01 | etudes.org               |         2736 |
| 2015-01-01 | qq.com                   |         1955 |
| 2015-01-01 | sly.mn                   |         1908 |
| 2015-01-01 | foothill.edu             |         1848 |
# Step 2: exclude email providers
The heavy lifting was done by Big Query. We exported the result into one csv and after that we used the good old Jupyter Notebooks to clean up the data.

As you can see in the example result, not surprisingly, the first one is gmail.com. We have to remove the email providers from the list. The list of the most popular email provider’s domains is available here: https://gist.github.com/tbrianjones/5992856/. We used this list to clean up the result.
Combined with other blacklisted domains.

The full notebook can be found here https://gist.github.com/codersrankOrg/77073c25ce5f7e7e6d4d77750b46e899.
