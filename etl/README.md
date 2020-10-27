## Project Looo ETL

The github archive data is stored in a public BigQuery dataset. We used the [biggerquery](https://pypi.org/project/biggerquery/) 
python library to interact with the dataset.

### ETL Steps

As a first step, we have to extract the data regarding the commits from all PushEvents from BigQuery.
The Github API changed significantly at the end of 2014, so we use two separate queries (old and new API sql-s).
The old API is used from 2011 to the end of 2014. The new API is used from 2015 and between 2011 november to 2012
february. Among others, we extract the repo_id, repo_name, email_address and the domain of the email for every commit.

For more details, check the `get_data_from_gh_archive.ipynb` jupyter notebook.

As a second step, we count the number of distinct commit sha-s per email domain per repo. In this step, we also do some
cleaning. We remove all the public email domains (like gmail.com). These domains can be found in the `skip-domains.txt`.
We also use a simple regex to remove domains like localhost, none and ubuntu. The resulting table will contain the
number of commits per repo_id and email_domain. We used a separate table to match the repo_id with the latest repo name
(as the name of repositories change quite often).

In the finishing steps, we used simple aggregations to count the total number of commits per domain and also the top repositories
per domain. In this step we also removed some repos altogether because of a massive number of commits from bots. These bots were 
identified manually.
 
# TODOS

1. Use a modern data analysis framework (like d6tflow or dagster) to make the etl process easier to fully automate
2. Find an efficient and automated way to remove bots
3. make the whole process automatic